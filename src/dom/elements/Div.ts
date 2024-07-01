import type { StaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * create a div tag
 *
 * @export
 * @param {ContainerTagBody} body
 * @return {*}  {StaticComponent}
 */
export default function Div(body: ContainerTagBody): StaticComponent {
    return ContainerTag("div", body)
}
