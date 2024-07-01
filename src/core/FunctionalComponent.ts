import BaseComponent from "./BaseComponent"
import { getRoot, setRoot } from "./TreeContext"

export type GenericAsyncComponentFn = (
    render: (body: () => void) => void,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    props: any,
    ctx: BTComponentContext
) => Promise<BaseComponent>
export type GenericSyncComponentFn = (
    render: (body: () => void) => void,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    props: any,
    ctx: BTComponentContext
) => BaseComponent
export type GenericComponentFn =
    | GenericAsyncComponentFn
    | GenericSyncComponentFn

export type BTComponentContext = {
    debug(): void
    get<T>(name: string): T
    set<T>(name: string, value: T): void
}

/**
 * Functional Component
 *
 * @export
 * @class FunctionalComponent
 * @extends {BaseComponent}
 */
export default class FunctionalComponent extends BaseComponent {
    componentFN: GenericComponentFn | null = null
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    props: any = {}
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    data: any = {}
    context: BTComponentContext
    _changeTimeout: ReturnType<typeof setTimeout> | null = null

    constructor() {
        super()
        this.type = "functional"
        this.debugName = "FunctionalComponent"

        this.context = {
            debug: () => {
                console.log("DEBUG", this.debugName, "context", this.data)
            },
            get: (name: string) => {
                return this.data[name]
            },
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            set: (name: string, value: any) => {
                if (this.data[name] !== value) {
                    this.needsUpdate = true
                    this.data[name] = value
                    if (this._changeTimeout) {
                        clearTimeout(this._changeTimeout)
                    }
                    this._changeTimeout = setTimeout(() => {
                        // make sure we only have one pending change/update
                        // at a time, and that we call it at the end of the
                        // current event loop
                        this._changeTimeout = null
                        this.render()
                    }, 0)
                }
            },
        }
    }

    destroy(): void {
        super.destroy()
    }

    get _compareId(): string {
        return `${this.type}-${this.debugName}`
    }

    // MARK: Render

    render() {
        if (this.needsUpdate) {
            this.needsUpdate = false
            if (this.componentFN) {
                // console.log("----", this.debugName)
                const prevChildren = this.children
                this.children = []
                const currentRoot = getRoot()
                setRoot(this)
                const componentRender = (body: () => void) => {
                    body()
                    setRoot(currentRoot)

                    for (let i = 0; i < this.children.length; i++) {
                        const child = this.children[i]
                        let prev: BaseComponent | null = null
                        if (prevChildren.length > i) {
                            prev = prevChildren[i]
                        }

                        if (prev?._compareId === child._compareId) {
                            // console.log("Func: reusing", child)
                            child.node = prev.node
                            child.children = prev.children
                            child.needsUpdate = true
                            prev.destroy()
                        }
                        // TODO: destroy removed children
                    }

                    const renderParent = this._renderParent
                    if (renderParent) {
                        renderParent.render()
                    } else {
                        this.render()
                    }
                }
                this.componentFN(componentRender, this.props, this.context)
            }
        } else {
            super.render()
        }
    }
}
