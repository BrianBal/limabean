import type { StaticComponent } from "../../core"
import TextTag, { type TextTagBody } from "./TextTag"

/**
 * Creates an H6 heading component with the given body content.
 *
 * @param {TextTagBody} body - The content of the H4 heading.
 * @return {StaticComponent} The H4 heading component.
 */
export default function H6(body: TextTagBody): StaticComponent {
    return TextTag("h6", body)
}
