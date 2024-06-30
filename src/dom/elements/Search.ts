import type { BTStaticComponent } from "../../core"
import ContainerTag, { type ContainerTagBody } from "./ContainerTag"

/**
 * create a search tag
 *
 * @export
 * @param {ContainerTagBody} body
 * @return {*}  {BTStaticComponent}
 */
export default function Search(body: ContainerTagBody): BTStaticComponent {
    return ContainerTag("search", body)
}
