import type { BTStaticComponent } from "../../core"
import TextTag, { type TextTagBody } from "./TextTag"

/**
 * Creates a list item (li) element with the given body.
 *
 * @param {ContainerTagBody} body - The body of the list item element.
 * @return {BTStaticComponent} - The list item element.
 */
export default function Opt(value: string, body: TextTagBody): BTStaticComponent {
    const tag = TextTag("option", body)
    tag.attr("value", value)
    return tag
}
