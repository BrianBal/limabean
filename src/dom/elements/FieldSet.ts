import type { StaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * create a fieldset tag
 *
 * @export
 * @param {ContainerTagBody} body
 * @return {*}  {StaticComponent}
 */
export default function FieldSet(body: ContainerTagBody): StaticComponent {
  return ContainerTag("fieldset", body)
}
