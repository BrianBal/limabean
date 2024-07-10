import type BaseComponent from "./BaseComponent"
import FunctionalComponent, { type BTComponentContext } from "./FunctionalComponent"
import { push } from "./TreeContext"

export type RenderFunctionCleanup = () => void

export type AsyncComponentFN<T> = (
  // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
  render: (body: () => void) => RenderFunctionCleanup | void,
  props: T,
  ctx: BTComponentContext,
) => void
export type SyncComponentFN<T> = (
  // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
  render: (body: () => void) => RenderFunctionCleanup | void,
  props: T,
  ctx: BTComponentContext,
) => void
export type ComponentFn<T> = AsyncComponentFN<T> | SyncComponentFN<T>

/**
 * Create a Functional Component
 *
 * @export
 * @template T
 * @param {ComponentFn<T>} fnc
 * @param {BaseComponent} [placeholder=null]
 * @param {string} [name="Anonymous"]
 * @return {*}  {(props: T) => BaseComponent}
 */
export default function component<T>(
  fnc: ComponentFn<T>,
  placeholder: BaseComponent = null,
  name = "Anonymous",
): (props: T) => FunctionalComponent {
  return (props: T) => {
    const el = new FunctionalComponent()
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    el.componentFN = fnc as any
    el.placeholderElement = placeholder
    el.debugName = name
    el.props = props
    const pop = push(el, true)
    pop()
    return el
  }
}
