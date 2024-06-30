import { BTStaticComponent, push } from "../../core"

/**
 * Creates a text node with the given text.
 *
 * @export
 * @param {string} text
 * @return {*}  {BTStaticComponent}
 */
export default function Txt(text: string): BTStaticComponent {
    const el = BTStaticComponent.createText(text)
    const pop = push(el, true)
    pop()
    return el
}
