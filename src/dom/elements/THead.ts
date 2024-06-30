import type { BTStaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * create a thead tag
 *
 * @export
 * @param {ContainerTagBody} body
 * @return {*}  {BTStaticComponent}
 */
export default function THead(body: ContainerTagBody): BTStaticComponent {
    return ContainerTag("table", body)
}
