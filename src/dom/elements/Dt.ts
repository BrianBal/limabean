import type { StaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * create a dt tag
 *
 * @export
 * @param {ContainerTagBody} body
 * @return {*}  {StaticComponent}
 */
export default function Dt(body: ContainerTagBody): StaticComponent {
    return ContainerTag("Dt", body)
}
