import type { BTStaticComponent } from "../../core"
import TextTag, { type TextTagBody } from "./TextTag"

/**
 * Creates a paragraph element component with the given body content.
 *
 * @export
 * @param {TextTagBody} body
 * @return {*}  {BTStaticComponent}
 */
export default function P(body: TextTagBody): BTStaticComponent {
    return TextTag("p", body)
}
