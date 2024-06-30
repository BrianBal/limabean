import type { BTStaticComponent } from "../../core"
import TextTag, { type TextTagBody } from "./TextTag"

/**
 * Create an anchor tag
 *
 * @export
 * @param {(string | null)} href
 * @param {TextTagBody} body
 * @param {(((e: MouseEvent) => void) | null)} [onClick=null]
 * @return {*}  {BTStaticComponent}
 */
export default function A(
    href: string | null,
    body: TextTagBody,
    onClick: ((e: MouseEvent) => void) | null = null,
): BTStaticComponent {
    const comp = TextTag("a", body)
    if (href) {
        comp.attr("href", href)
    }
    if (onClick) {
        comp.on("click", onClick)
    }
    return comp
}
