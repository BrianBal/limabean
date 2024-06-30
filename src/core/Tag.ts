import BTStaticComponent from "./BTStaticComponent"
import { getPrevRoot, getRoot, push, setPrevRoot, setRoot } from "./TreeContext"

export type TagProps = {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    [key: string]: any
}

export type TagBodyFN = () => void

/**
 * Create a tag for the given tag name and props
 *
 * @export
 * @param {string} tag
 * @param {TagProps} props
 * @param {(TagBodyFN | null)} [body=null]
 * @return {*}  {BTStaticComponent}
 */
export default function Tag(
    tag: string,
    props: TagProps,
    body: TagBodyFN | null = null,
): BTStaticComponent {
    const el = new BTStaticComponent(tag, props, body)
    for (const key in props) {
        el.attr(key, props[key])
    }
    el.setDebugName(tag)
    const pop = push(el, true)
    pop()
    return el
}
