import type { StaticComponent } from "../../core"
import TextTag, { type TextTagBody } from "./TextTag"

/**
 * Creates an strong element with the given body content.
 *
 * @param {TextTagBody} body - The content of the H4 heading.
 * @return {StaticComponent} The H4 heading component.
 */
export default function Strong(body: TextTagBody): StaticComponent {
  return TextTag("strong", body)
}
