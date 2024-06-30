import { Tag, type BTStaticComponent, type TagBodyFN } from "../../core"

export type TextTagBody = string | TagBodyFN | null

/**
 * Creates an HR element component.
 *
 * @return {BTStaticComponent} The HR element component.
 */
export default function HR(): BTStaticComponent {
    return Tag("hr", {})
}
