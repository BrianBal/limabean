import type { BTStaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * Create an dd tag
 *
 * @export
 * @param {ContainerTagBody} body
 * @return {*}  {BTStaticComponent}
 */
export default function Dd(body: ContainerTagBody): BTStaticComponent {
    return ContainerTag("Dd", body)
}
