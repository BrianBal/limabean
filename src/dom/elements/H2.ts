import type { BTStaticComponent } from "../../core"
import TextTag, { type TextTagBody } from "./TextTag"

/**
 * Creates an H2 heading component with the given body content.
 *
 * @param {TextTagBody} body - The content of the H2 heading.
 * @return {BTStaticComponent} The H2 heading component.
 */
export default function H2(body: TextTagBody): BTStaticComponent {
    return TextTag("h2", body)
}
