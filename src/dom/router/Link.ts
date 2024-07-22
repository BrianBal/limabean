import { component } from "../../core"
import A from "../elements/A"
import type { TextTagBody } from "../elements/TextTag"

type RouteProps = {
    // path could be like /home for a static route
    // or /home/:id for a dynamic route
    link: string
    text: TextTagBody
    pageTitle?: string
    onClick?: ((e: MouseEvent) => void) | null
}

const Link = component<RouteProps>(
    (render, props, ctx) => {
        const clickHandler = (e: MouseEvent) => {
            if (props.onClick) {
                props.onClick(e)
            }
            if (!e.defaultPrevented) {
                e.preventDefault()
                const base = ctx.get<string>("Router.base") ?? ""
                const useHashRoutes = ctx.get<boolean>("Router.useHashRoutes") ?? false

                let path = base + props.link
                // remove duplicate slashes
                path = path.replace(/\/+/g, "/")

                if (useHashRoutes) {
                    window.location.hash = `#${path}`
                } else {
                    history.pushState({ now: Date.now() }, props.pageTitle ?? document.title, path)
                }
            }
        }

        render(() => {
            A(props.link, props.text).on("click", clickHandler)
        })
    },
    null,
    "Link",
)

export default Link
