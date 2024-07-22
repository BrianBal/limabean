import type { StaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * Create an dd tag
 *
 * @export
 * @param {ContainerTagBody} body
 * @return {*}  {StaticComponent}
 */
export default function Dd(body: ContainerTagBody): StaticComponent {
    return ContainerTag("Dd", body)
}
