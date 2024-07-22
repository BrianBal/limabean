import { component } from "../../core"
import type { TagBodyFN } from "../../core"
import { getRouterPath, setRouterPath } from "./RouterState"
import getHashPath from "./getHashPath"
import getPath from "./getPath"

type RouteOptions = {
    base: string
    useHashRoutes?: boolean
}

type RouterProps = {
    options: RouteOptions
    body: TagBodyFN
}

// Patch history.pushState and history.replaceState
let patched = false
function patchHistory() {
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState
    history.pushState = function (...args) {
        originalPushState.apply(this, args)
        window.dispatchEvent(new Event("locationchange"))
    }
    history.replaceState = function (...args) {
        originalReplaceState.apply(this, args)
        window.dispatchEvent(new Event("locationchange"))
    }
}
if (!patched) {
    patchHistory()
    patched = true
}

const Router = component<RouterProps>(
    (render, props, ctx) => {
        // Initialize the current path in the context
        const base = props.options.base ?? ""
        const useHashRoutes = props.options.useHashRoutes ?? false

        const livePath = useHashRoutes ? getHashPath(base, window.location) : getPath(base, window.location)
        const currentPath = getRouterPath()
        if (currentPath !== livePath) {
            setRouterPath(livePath)
        }

        // update the context with router info (base, useHashRoutes, currentPath)
        ctx.set<string>("Router.base", base)
        ctx.set<boolean>("Router.useHashRoutes", useHashRoutes)
        ctx.set<string>("Router.currentPath", currentPath)

        // Function to handle location changes
        const handleLocationChange = () => {
            const livePath = useHashRoutes ? getHashPath(base, window.location) : getPath(base, window.location)

            if (livePath !== currentPath) {
                console.log("Router.handleLocationChange changed", livePath)
                setRouterPath(livePath)
            }
        }

        // Listen for popstate events (back/forward navigation)
        window.addEventListener("popstate", handleLocationChange)
        window.addEventListener("locationchange", handleLocationChange)
        window.addEventListener("hashchange", handleLocationChange)

        render(() => {
            props.body()

            return () => {
                console.log("Router.unmount")
                window.removeEventListener("popstate", handleLocationChange)
                window.removeEventListener("locationchange", handleLocationChange)
                window.removeEventListener("hashchange", handleLocationChange)
            }
        })
    },
    null,
    "Router",
)

export default Router
