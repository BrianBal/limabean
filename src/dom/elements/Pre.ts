import type { StaticComponent } from "../../core"
import TextTag, { type TextTagBody } from "./TextTag"

/**
 * Create a pre tag
 *
 * @export
 * @param {TextTagBody} body
 * @return {*}  {StaticComponent}
 */
export default function Pre(body: TextTagBody): StaticComponent {
    return TextTag("pre", body)
}
