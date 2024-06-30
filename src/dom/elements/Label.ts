import type { BTStaticComponent } from "../../core"
import TextTag, { type TextTagBody } from "./TextTag"

/**
 * Creates an label element with the given body content.
 *
 * @param {TextTagBody} body - The content of the H4 heading.
 * @return {BTStaticComponent} The H4 heading component.
 */
export default function Label(body: TextTagBody): BTStaticComponent {
    return TextTag("label", body)
}
