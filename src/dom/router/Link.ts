import { component } from "../../core"
import type { TextTagBody } from "../elements/TextTag"
import A from "../elements/A"

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
            e.preventDefault()
            if (props.onClick) {
                props.onClick(e)
            }
            history.pushState(
                null,
                props.pageTitle ?? document.title,
                props.link
            )
        }

        render(() => {
            A(props.link, props.text).on("click", clickHandler)
        })
    },
    null,
    "Link"
)

export default Link
