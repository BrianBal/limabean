import BaseComponent from "./BaseComponent"
import { getRoot, setRoot } from "./TreeContext"
import type { RenderFunctionCleanup } from "./component"

export type GenericAsyncComponentFn = (
    // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
    render: (body: () => void) => RenderFunctionCleanup | void,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    props: any,
    ctx: BTComponentContext,
) => Promise<BaseComponent>
export type GenericSyncComponentFn = (
    // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
    render: (body: () => void) => RenderFunctionCleanup | void,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    props: any,
    ctx: BTComponentContext,
) => BaseComponent
export type GenericComponentFn = GenericAsyncComponentFn | GenericSyncComponentFn

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
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    static contextData: { [name: string]: any } = {}

    componentFN: GenericComponentFn | null = null
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    props: any = {}
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    data: any = {}
    context: BTComponentContext
    _changeTimeout: ReturnType<typeof setTimeout> | null = null
    _cleanupFn: RenderFunctionCleanup | null = null
    _isRendering = false

    constructor() {
        super()
        this.type = "functional"
        this.debugName = "FunctionalComponent"

        this.context = {
            debug: () => {
                console.log("DEBUG", this.debugName, "context", FunctionalComponent.contextData)
            },
            get: (name: string) => {
                return FunctionalComponent.contextData[name]
            },
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            set: (name: string, value: any) => {
                if (FunctionalComponent.contextData[name] !== value) {
                    this.needsUpdate = true
                    FunctionalComponent.contextData[name] = value
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
            if (this._isRendering) {
                this.needsUpdate = true
                return
            }
            this._isRendering = true
            this.needsUpdate = false
            if (this.componentFN) {
                const prevChildren = this.children
                this.children = []
                // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
                const componentRender = (body: () => RenderFunctionCleanup | void) => {
                    const currentRoot = getRoot()
                    setRoot(this)
                    this._cleanupFn = body() as RenderFunctionCleanup | null
                    setRoot(currentRoot)

                    const destroyedIds: string[] = []
                    for (let i = 0; i < this.children.length; i++) {
                        const child = this.children[i]
                        let prev: BaseComponent | null = null
                        if (prevChildren.length > i) {
                            prev = prevChildren[i]
                        }

                        if (prev?._compareId === child._compareId) {
                            if (prev instanceof FunctionalComponent && prev._isRendering) {
                                this.children[i] = prev
                                prevChildren[i] = child
                            } else {
                                child.node = prev.node
                                child.children = prev.children
                                child.needsUpdate = true
                                prev.destroy()
                                destroyedIds.push(child.id)
                            }
                        }
                    }
                    for (let i = 0; i < prevChildren.length; i++) {
                        const child: FunctionalComponent = prevChildren[i] as FunctionalComponent
                        if (!destroyedIds.includes(child.id)) {
                            if (child._cleanupFn) {
                                child._cleanupFn()
                            }
                            child.destroy()
                        }
                    }

                    const renderParent = this._renderParent
                    this._isRendering = false
                    if (renderParent) {
                        // re-render parent so changes are reflected
                        renderParent.render()
                    } else {
                        // if no parent, render self
                        this.render()
                    }
                }
                if (this._cleanupFn) {
                    this._cleanupFn()
                }
                this.componentFN(componentRender, this.props, this.context)
            }
        } else {
            super.render()
        }
    }
}
