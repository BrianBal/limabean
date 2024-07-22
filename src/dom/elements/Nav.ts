import type { StaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * Creates a navigation element with the given body.
 *
 * @param {ContainerTagBody} body - The content of the navigation element.
 * @return {StaticComponent} The navigation element.
 */
export default function Nav(body: ContainerTagBody): StaticComponent {
    return ContainerTag("nav", body)
}
