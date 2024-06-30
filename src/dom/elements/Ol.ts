import type { BTStaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * Create an ordered list (ol) element with the specified body.
 *
 * @param {ContainerTagBody} body - The body of the ordered list element.
 * @return {BTStaticComponent} The ordered list element.
 */
export default function Ol(body: ContainerTagBody): BTStaticComponent {
    return ContainerTag("ol", body)
}
