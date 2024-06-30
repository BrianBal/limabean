import type { BTStaticComponent } from "../../core"
import TextTag, { type TextTagBody } from "./TextTag"

/**
 * Create a button tag
 *
 * @export
 * @param {TextTagBody} body
 * @param {(((e: MouseEvent) => void) | null)} [onClick=null]
 * @return {*}  {BTStaticComponent}
 */
export default function Button(
    body: TextTagBody,
    onClick: ((e: MouseEvent) => void) | null = null,
): BTStaticComponent {
    const comp = TextTag("button", body)
    if (onClick) {
        comp.on("click", onClick)
    }
    return comp
}
