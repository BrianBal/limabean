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
        this._isRendering = true
        const start = performance.now()
        setRoot(this)
        if (this.node) {
            super.render()
        } else {
            console.warn(
                "RootComponent.render: rendering without node",
                this.id,
                this.debugName
            )
        }
        console.log("root render time", performance.now() - start, "ms")
        this._isRendering = false
        setRoot(null)
        // debugTree(0, this)

        // render again if needed
        if (this._pendingRender) {
            this._pendingRender = false
            setTimeout(() => {
                this.render()
            }, 0)
        }
    }
}

function debugTree(level: number, node: BaseComponent) {
    console.log("  ".repeat(level), "-", node.debugName)
    for (const c of node.children) {
        debugTree(level + 1, c)
    }
}
