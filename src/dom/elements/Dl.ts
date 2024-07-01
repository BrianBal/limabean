import type { StaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * Create an dl tag
 *
 * @export
 * @param {ContainerTagBody} body
 * @return {*}  {StaticComponent}
 */
export default function Dl(body: ContainerTagBody): StaticComponent {
    return ContainerTag("dl", body)
}
