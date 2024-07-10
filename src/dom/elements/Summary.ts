import type { StaticComponent } from "../../core"
import TextTag, { type TextTagBody } from "./TextTag"

/**
 * Create a summary tag
 *
 * @export
 * @param {TextTagBody} body
 * @return {*}  {StaticComponent}
 */
export default function Summary(body: TextTagBody): StaticComponent {
  return TextTag("summary", body)
}
