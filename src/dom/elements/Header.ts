import type { StaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * Creates a Header component with the given body.
 *
 * @param {ContainerTagBody} body - The body of the Header component.
 * @return {StaticComponent} - The Header component.
 */
export default function Header(body: ContainerTagBody): StaticComponent {
    return ContainerTag("header", body)
}
