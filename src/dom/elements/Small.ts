import type { StaticComponent } from "../../core"
import TextTag, { type TextTagBody } from "./TextTag"

/**
 * Creates an small element with the given body content.
 *
 * @param {TextTagBody} body - The content of the H4 heading.
 * @return {StaticComponent} The H4 heading component.
 */
export default function Small(body: TextTagBody): StaticComponent {
    return TextTag("small", body)
}
