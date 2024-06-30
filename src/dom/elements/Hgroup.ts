import type { BTStaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * Creates a hgroup elment with the given body.
 *
 * @param {ContainerTagBody} body - The body of the Main component.
 * @return {BTStaticComponent} - The Main component.
 */
export default function HGroup(body: ContainerTagBody): BTStaticComponent {
    return ContainerTag("hgroup", body)
}
