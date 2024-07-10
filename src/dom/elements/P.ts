import type { StaticComponent } from "../../core"
import TextTag, { type TextTagBody } from "./TextTag"

/**
 * Creates a paragraph element component with the given body content.
 *
 * @export
 * @param {TextTagBody} body
 * @return {*}  {StaticComponent}
 */
export default function P(body: TextTagBody): StaticComponent {
  return TextTag("p", body)
}
