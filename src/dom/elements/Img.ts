import { type StaticComponent, Tag, type TagBodyFN } from "../../core"

export type TextTagBody = string | TagBodyFN | null

/**
 * Creates an image element component.
 *
 * @return {StaticComponent} The HR element component.
 */
export default function Img(src: string, alt: string): StaticComponent {
  return Tag("img", { src, alt })
}
