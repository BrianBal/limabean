import type { StaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * Creates a hgroup elment with the given body.
 *
 * @param {ContainerTagBody} body - The body of the Main component.
 * @return {StaticComponent} - The Main component.
 */
export default function HGroup(body: ContainerTagBody): StaticComponent {
  return ContainerTag("hgroup", body)
}
