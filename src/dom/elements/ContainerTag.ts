import { type StaticComponent, Tag } from "../../core"
import type { TagBodyFN } from "../../core"

export type ContainerTagBody = TagBodyFN | null

/**
 * Create a containerish tag that mainly groups other tags
 *
 * @export
 * @param {string} tag
 * @param {ContainerTagBody} body
 * @return {*}  {StaticComponent}
 */
export default function ContainerTag(tag: string, body: ContainerTagBody): StaticComponent {
    return Tag(tag, {}, body)
}
