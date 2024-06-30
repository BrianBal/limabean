import type { BTStaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * Creates a Header component with the given body.
 *
 * @param {ContainerTagBody} body - The body of the Header component.
 * @return {BTStaticComponent} - The Header component.
 */
export default function Header(body: ContainerTagBody): BTStaticComponent {
    return ContainerTag("header", body)
}
