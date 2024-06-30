import type { BTStaticComponent } from "../../core"
import TextTag, { type TextTagBody } from "./TextTag"

/**
 * Create a summary tag
 *
 * @export
 * @param {TextTagBody} body
 * @return {*}  {BTStaticComponent}
 */
export default function Summary(body: TextTagBody): BTStaticComponent {
    return TextTag("summary", body)
}
