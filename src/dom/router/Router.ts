import { component } from "../../core"
import type { TagBodyFN } from "../../core"
import { setRouterPath } from "./RouterState"

type RouterProps = {
    base: string
    body: TagBodyFN
}

const Router = component<RouterProps>(
    (render, props, ctx) => {
        // Initialize the current path in the context
        ctx.set("currentPath", window.location.pathname)
        setRouterPath(window.location.pathname)

        // Function to handle location changes
        const handleLocationChange = () => {
            const newPath = window.location.pathname
            const currentPath = ctx.get<string>("currentPath")

            if (newPath !== currentPath) {
                ctx.set("currentPath", newPath)
                setRouterPath(newPath)
                // Broadcast a custom event that the URL has changed
                window.dispatchEvent(
                    new CustomEvent("urlChanged", {
                        detail: { path: newPath },
                    })
                )
            }
        }

        // Listen for popstate events (back/forward navigation)
        window.addEventListener("popstate", handleLocationChange)

        // Listen for pushstate and replacestate events
        const originalPushState = history.pushState
        const originalReplaceState = history.replaceState

        history.pushState = function (...args) {
            originalPushState.apply(this, args)
            handleLocationChange()
        }

        history.replaceState = function (...args) {
            originalReplaceState.apply(this, args)
            handleLocationChange()
        }

        render(() => {
            props.body()
        })

        // Clean up event listeners when the component is unmounted
        // return () => {
        //    window.removeEventListener("popstate", handleLocationChange)
        //    history.pushState = originalPushState
        //    history.replaceState = originalReplaceState
        // }
    },
    null,
    "Router"
)

export default Router
