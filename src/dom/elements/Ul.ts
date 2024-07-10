import type { StaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * Creates an unordered list (ul) element with the specified body.
 *
 * @export
 * @param {ContainerTagBody} body
 * @return {*}  {StaticComponent}
 */
export default function Ul(body: ContainerTagBody): StaticComponent {
  return ContainerTag("ul", body)
}
