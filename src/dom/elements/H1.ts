import type { StaticComponent } from "../../core"
import TextTag, { type TextTagBody } from "./TextTag"

/**
 * Creates an H1 heading component with the given body content.
 *
 * @param {TextTagBody} body - The content of the H1 heading.
 * @return {StaticComponent} The H1 heading component.
 */
export default function H1(body: TextTagBody): StaticComponent {
  return TextTag("h1", body)
}
