import type { BTStaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * create a table tag
 *
 * @export
 * @param {ContainerTagBody} body
 * @return {*}  {BTStaticComponent}
 */
export default function Table(body: ContainerTagBody): BTStaticComponent {
    return ContainerTag("table", body)
}
