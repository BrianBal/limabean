import type { StaticComponent } from "../../core"
import TextTag, { type TextTagBody } from "./TextTag"

/**
 * Creates an H3 heading component with the given body content.
 *
 * @param {TextTagBody} body - The content of the H3 heading.
 * @return {StaticComponent} The H3 heading component.
 */
export default function H3(body: TextTagBody): StaticComponent {
  return TextTag("h3", body)
}
