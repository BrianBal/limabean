import type { StaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * Creates a list item (li) element with the given body.
 *
 * @param {ContainerTagBody} body - The body of the list item element.
 * @return {StaticComponent} - The list item element.
 */
export default function Li(body: ContainerTagBody): StaticComponent {
    return ContainerTag("li", body)
}
