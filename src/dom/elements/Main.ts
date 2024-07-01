import type { StaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * Creates a Main component with the given body.
 *
 * @param {ContainerTagBody} body - The body of the Main component.
 * @return {StaticComponent} - The Main component.
 */
export default function Main(body: ContainerTagBody): StaticComponent {
    return ContainerTag("main", body)
}
