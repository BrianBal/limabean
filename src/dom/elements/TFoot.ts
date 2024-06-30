import type { BTStaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * create a tfoot tag
 *
 * @export
 * @param {ContainerTagBody} body
 * @return {*}  {BTStaticComponent}
 */
export default function TFoot(body: ContainerTagBody): BTStaticComponent {
    return ContainerTag("tfoot", body)
}
