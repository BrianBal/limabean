import type BTBaseComponent from "./BTBaseComponent"
import BTFunctionalComponent, {
    type BTComponentContext,
} from "./BTFunctionalComponent"
import { getRoot, push } from "./TreeContext"

export type AsyncComponentFN<T> = (
    render: (body: () => void) => void,
    props: T,
    ctx: BTComponentContext,
) => void
export type SyncComponentFN<T> = (
    render: (body: () => void) => void,
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
 * @param {BTBaseComponent} [placeholder=null]
 * @param {string} [name="Anonymous"]
 * @return {*}  {(props: T) => BTBaseComponent}
 */
export default function component<T>(
    fnc: ComponentFn<T>,
    placeholder: BTBaseComponent = null,
    name = "Anonymous",
): (props: T) => BTFunctionalComponent {
    return (props: T) => {
        const el = new BTFunctionalComponent()
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
