import type { BTStaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * create a fieldset tag
 *
 * @export
 * @param {ContainerTagBody} body
 * @return {*}  {BTStaticComponent}
 */
export default function FieldSet(body: ContainerTagBody): BTStaticComponent {
    return ContainerTag("fieldset", body)
}
