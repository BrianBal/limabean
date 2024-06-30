import type { BTStaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * Creates an unordered list (ul) element with the specified body.
 *
 * @export
 * @param {ContainerTagBody} body
 * @return {*}  {BTStaticComponent}
 */
export default function Ul(body: ContainerTagBody): BTStaticComponent {
    return ContainerTag("ul", body)
}
