import { StaticComponent, push } from "../../core"

/**
 * Creates a text node with the given text.
 *
 * @export
 * @param {string} text
 * @return {*}  {StaticComponent}
 */
export default function Txt(text: string): StaticComponent {
    const el = StaticComponent.createText(text)
    const pop = push(el, true)
    pop()
    return el
}
