import { Tag, type StaticComponent, type TagBodyFN } from "../../core"

export type TextTagBody = string | TagBodyFN | null

/**
 * Creates an HR element component.
 *
 * @return {StaticComponent} The HR element component.
 */
export default function HR(): StaticComponent {
  return Tag("hr", {})
}
