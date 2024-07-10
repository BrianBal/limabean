import type { StaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * create a tfoot tag
 *
 * @export
 * @param {ContainerTagBody} body
 * @return {*}  {StaticComponent}
 */
export default function TFoot(body: ContainerTagBody): StaticComponent {
  return ContainerTag("tfoot", body)
}
