import type { BTStaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * Creates a navigation element with the given body.
 *
 * @param {ContainerTagBody} body - The content of the navigation element.
 * @return {BTStaticComponent} The navigation element.
 */
export default function Nav(body: ContainerTagBody): BTStaticComponent {
    return ContainerTag("nav", body)
}
