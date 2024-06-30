import { Tag, type BTStaticComponent, type TagBodyFN } from "../../core"

export type TextTagBody = string | TagBodyFN | null

/**
 * Creates an image element component.
 *
 * @return {BTStaticComponent} The HR element component.
 */
export default function Img(src: string, alt: string): BTStaticComponent {
    return Tag("img", { src, alt })
}
