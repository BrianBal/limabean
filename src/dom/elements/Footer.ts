import type { BTStaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * Create a footer tag
 *
 * @export
 * @param {ContainerTagBody} body
 * @return {*}  {BTStaticComponent}
 */
export default function Footer(body: ContainerTagBody): BTStaticComponent {
    return ContainerTag("footer", body)
}
