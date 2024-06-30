import type { BTStaticComponent } from "../../core"
import TextTag, { type TextTagBody } from "./TextTag"

/**
 * Creates an strong element with the given body content.
 *
 * @param {TextTagBody} body - The content of the H4 heading.
 * @return {BTStaticComponent} The H4 heading component.
 */
export default function Strong(body: TextTagBody): BTStaticComponent {
    return TextTag("strong", body)
}
