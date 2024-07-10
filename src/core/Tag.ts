import StaticComponent from "./StaticComponent"
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
 * @return {*}  {StaticComponent}
 */
export default function Tag(tag: string, props: TagProps, body: TagBodyFN | null = null): StaticComponent {
  const el = new StaticComponent(tag, props, body)
  for (const key in props) {
    el.attr(key, props[key])
  }
  el.setDebugName(tag)
  const pop = push(el, true)
  pop()
  return el
}
