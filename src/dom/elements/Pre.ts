import type { BTStaticComponent } from "../../core"
import TextTag, { type TextTagBody } from "./TextTag"

/**
 * Create a pre tag
 *
 * @export
 * @param {TextTagBody} body
 * @return {*}  {BTStaticComponent}
 */
export default function Pre(body: TextTagBody): BTStaticComponent {
    return TextTag("pre", body)
}
