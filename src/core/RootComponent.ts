import BaseComponent from "./BaseComponent"
import type { Ref } from "./Ref"
import { setRoot } from "./TreeContext"

/**
 * Root Component
 *
 * @export
 * @class RootComponent
 * @extends {BaseComponent}
 */
export default class RootComponent extends BaseComponent {
    _isRendering = false
    _pendingRender = false

    constructor(rootEl: HTMLElement) {
        super()
        this.debugName = "root"
        this.type = "root"
        this.node = rootEl

        this.__debug = this.__debug.bind(this)
        document.addEventListener("__debug", this.__debug)
    }

    // MARK: Events

    registerRef(ref: Ref<unknown>): void {
        // no op
    }

    onRefChange(e: CustomEvent): void {
        // no op
    }

    onChange(): void {
        if (!this._isRendering) {
            this.render()
        } else {
            this._pendingRender = true
        }
    }

    // MARK: Render

    render() {
        if (!this._isRendering) {
            this._isRendering = true
            const start = performance.now()
            setRoot(this)
            if (this.node) {
                super.render()
            } else {
                console.warn("RootComponent.render: rendering without node", this.id, this.debugName)
            }
            console.log("root render time", performance.now() - start, "ms")
            setRoot(null)
            this._isRendering = false

            // render again if needed
            if (this._pendingRender) {
                console.log("RootComponent.render pending render", this.debugName)
                this._pendingRender = false
                setTimeout(() => {
                    this.render()
                }, 0)
            }
        } else {
            console.log("RootComponent.render already rending", this.debugName)
            this._pendingRender = true
        }
    }

    __debug() {
        debugTree(0, this)
    }
}

function debugTree(level: number, comp: BaseComponent) {
    console.log("  ".repeat(level), "-", comp.debugName, comp.node)
    for (const c of comp.children) {
        debugTree(level + 1, c)
    }
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const win = window as any
win.__debugTree = () => {
    document.dispatchEvent(new CustomEvent("__debug"))
}
