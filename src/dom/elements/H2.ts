import type { StaticComponent } from "../../core"
import TextTag, { type TextTagBody } from "./TextTag"

/**
 * Creates an H2 heading component with the given body content.
 *
 * @param {TextTagBody} body - The content of the H2 heading.
 * @return {StaticComponent} The H2 heading component.
 */
export default function H2(body: TextTagBody): StaticComponent {
    return TextTag("h2", body)
}
