import { Tag, type BTStaticComponent } from "../../core"
import type { TagBodyFN } from "../../core"

export type ContainerTagBody = TagBodyFN | null

/**
 * Create a containerish tag that mainly groups other tags
 *
 * @export
 * @param {string} tag
 * @param {ContainerTagBody} body
 * @return {*}  {BTStaticComponent}
 */
export default function ContainerTag(
    tag: string,
    body: ContainerTagBody,
): BTStaticComponent {
    return Tag(tag, {}, body)
}
