import type { BTStaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * Creates a Main component with the given body.
 *
 * @param {ContainerTagBody} body - The body of the Main component.
 * @return {BTStaticComponent} - The Main component.
 */
export default function Main(body: ContainerTagBody): BTStaticComponent {
    return ContainerTag("main", body)
}
