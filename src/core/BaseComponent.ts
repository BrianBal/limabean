import type FunctionalComponent from "./FunctionalComponent"
import type { Ref } from "./Ref"
import getUniqueId from "./lib/getUniqueId"

export type ChildItem = BaseComponent
export type EventListener = () => void

/**
 * Base component class
 *
 * @export
 * @class BaseComponent
 */
export default class BaseComponent {
    /**
     * unique identifier for the component
     *
     * @type {string}
     * @memberof BaseComponent
     */
    id: string = getUniqueId()

    /**
     * The type of the component
     *
     * @type {("static" | "text" | "functional" | "root")}
     * @memberof BaseComponent
     */
    type: "static" | "text" | "functional" | "root" = "static"
    debugName = "BaseComponent"
    node: HTMLElement | Node | null = null
    parent: BaseComponent | null = null
    children: ChildItem[] = []
    _hasDirtyChildren = false
    needsUpdate = true
    changeListeners: EventListener[] = []
    _usePlaceholder = false
    placeholderElement: BaseComponent | null = null
    _exclude = false
    _registeredRefs: string[] = []
    _hasRegisteredForRefs = false
    _scopedRefs: { [key: string]: Ref<unknown> } = {}

    constructor() {
        this.onRefChange = this.onRefChange.bind(this)
    }

    destroy() {
        this.parent = null
        if (this._hasRegisteredForRefs) {
            document.removeEventListener("ref-change", this.onRefChange)
        }
    }

    get _compareId(): string {
        return `${this.type}-${this.debugName}`
    }

    get _renderNode(): Node | null {
        let node: Node | null = null
        if (this.node) {
            node = this.node
        } else if (this.parent?._renderNode) {
            node = this.parent._renderNode
        }
        return node
    }

    get _renderHTMLNode(): HTMLElement | null {
        const node: Node | null = this._renderNode
        if (node instanceof HTMLElement) {
            return node
        }
        return null
    }

    get _renderParent(): BaseComponent | null {
        let parent: BaseComponent | null = null
        if (this.parent?.node) {
            parent = this.parent
        } else if (this.parent) {
            parent = this.parent._renderParent
        }
        return parent
    }

    get _funcParent(): FunctionalComponent | null {
        let parent: FunctionalComponent | null = null
        if (this.type === "functional") {
            parent = this as unknown as FunctionalComponent
        } else if (this.parent?.type === "functional") {
            parent = this.parent as FunctionalComponent
        } else if (this.parent) {
            parent = this.parent._funcParent as FunctionalComponent
        }
        return parent
    }

    // MARK: Children

    /**
     * Get the dirty state of children
     * @returns {boolean} True if children are dirty, false otherwise
     */
    get hasDirtyChildren() {
        return this._hasDirtyChildren
    }

    /**
     * Set the dirty state of children and propagate to parent
     * @param {boolean} v - The new dirty state
     */
    set hasDirtyChildren(v: boolean) {
        this._hasDirtyChildren = v
        if (this.parent && !this.parent.hasDirtyChildren && v) {
            this.parent.hasDirtyChildren = true
        }
    }

    /**
     * Get the HTML element associated with the component
     * @returns {HTMLElement | null} The HTML element or null if it's a text node
     */
    get htmlNode(): HTMLElement | null {
        if (this.type === "text") {
            return null
        }
        return this.node as HTMLElement | null
    }

    /**
     * Add child components to this component
     * @param {ChildItem[]} children - Array of child components to add
     */
    addChildren(children: ChildItem[]) {
        for (const child of children) {
            if (typeof child === "string") {
                this.children.push(child)
            } else {
                child.parent = this
                this.children.push(child)
            }
            this.hasDirtyChildren = true
        }
    }

    // MARK: Events

    registerRef(ref: Ref<unknown>) {
        if (!this._registeredRefs.includes(ref._id)) {
            this._registeredRefs.push(ref._id)
            if (!this._hasRegisteredForRefs) {
                document.addEventListener("ref-change", this.onRefChange)
                this._hasRegisteredForRefs = true
            }
        }
    }

    onRefChange(e: CustomEvent) {
        const fp = this._funcParent
        if (fp) {
            fp.needsUpdate = true
            fp.render()
        }
    }

    /**
     * Add an event listener to the component
     * @param {string} type - The type of event to listen for
     * @param {EventListener} listener - The callback function to execute when the event occurs
     */
    addEventListener(type: string, listener: EventListener) {
        if (type === "change") {
            this.changeListeners.push(listener)
        }
    }

    /**
     * Remove an event listener from the component
     * @param {string} type - The type of event to remove the listener from
     * @param {EventListener} listener - The callback function to remove
     */
    removeEventListener(type: string, listener: EventListener) {
        if (type === "change") {
            this.changeListeners = this.changeListeners.filter((l) => l !== listener)
        }
    }

    /**
     * Trigger change event and propagate to parent
     */
    onChange() {
        for (const l of this.changeListeners) {
            l()
        }
        this.parent?.onChange()
    }

    // MARK: Render

    /**
     * Render the component and its children
     */
    render() {
        const node = this._renderNode
        if (node === null) {
            return
        }
        if (this.type !== "text") {
            const childNodes: Node[] = []
            const childrenComps = [...this.children]
            for (let i = 0; i < childrenComps.length; i++) {
                const childComp = childrenComps[i]
                // childComp.parent = this
                if (childComp._exclude) {
                    continue
                }
                childComp.render()

                switch (childComp.type) {
                    case "text":
                    case "static":
                        if (childComp.node) {
                            childNodes.push(childComp.node)
                        }
                        break
                    case "functional":
                        if (childComp.children?.length > 0) {
                            // functional components do not have a node
                            // so we need to render their children here
                            // kinda works like react fragments
                            childrenComps.splice(i + 1, 0, ...childComp.children)
                        } else if (childComp.placeholderElement) {
                            childComp.placeholderElement.render()
                            childNodes.push(childComp.placeholderElement.node)
                        }
                        break
                    case "root":
                        break
                }
            }
            if (this.type !== "functional") {
                this.mergeChildNodes(childNodes)
            }
        }
    }

    /**
     * Merge child nodes with the existing DOM
     * @param {Node[]} newChildNodes - Array of new child nodes
     */
    mergeChildNodes(nextChildren: Node[]) {
        const node = this._renderHTMLNode
        if (node) {
            for (let i = 0; i < nextChildren.length; i++) {
                const next = nextChildren[i]
                let curr: Node | null = null
                if (node.childNodes.length > i) {
                    curr = node.childNodes[i]
                }

                if (curr === null) {
                    node.appendChild(next)
                } else if (curr !== next) {
                    node.replaceChild(next, curr)
                }
                // else same node skip
            }

            while (node.children.length > nextChildren.length) {
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
                node.removeChild(this.htmlNode.lastChild!)
            }
        }
    }

    // MARK: Attributes

    /**
     * Set the debug name for the component
     * @param {string} name - The debug name to set
     * @returns {this} The component instance for chaining
     */
    setDebugName(name: string): this {
        this.debugName = name
        return this
    }

    /**
     * Set a placeholder component
     * @param {BaseComponent} el - The placeholder component to set
     * @returns {this} The component instance for chaining
     */
    placeholderComponent(el: BaseComponent): this {
        this._usePlaceholder = true
        this.placeholderElement = el
        return this
    }

    /**
     * Set the exclude flag for the component
     * @param {boolean} val - The exclude flag value
     * @returns {this} The component instance for chaining
     */
    exclude(val: boolean): this {
        this._exclude = val
        return this
    }
}
