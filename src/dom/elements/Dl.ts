import type { BTStaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * Create an dl tag
 *
 * @export
 * @param {ContainerTagBody} body
 * @return {*}  {BTStaticComponent}
 */
export default function Dl(body: ContainerTagBody): BTStaticComponent {
    return ContainerTag("dl", body)
}
