import BaseComponent from "./BaseComponent"
import { Ref } from "./Ref"
import { getRoot, setRoot } from "./TreeContext"

type StaticProps = {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    [key: string]: any
}
export type StaticBodyFN = () => void
export type StaticBody = StaticBodyFN | string | null

type StaticEvents = {
    [key: string]: (e: Event) => void
}

/**
 * Static component
 *
 * @export
 * @class StaticComponent
 * @extends {BaseComponent}
 */
export default class StaticComponent extends BaseComponent {
    tagName: string
    props: StaticProps
    bodyFN: StaticBody | null
    events: StaticEvents = {}

    constructor(
        tag: string | null,
        props: StaticProps,
        body: StaticBody | null = null
    ) {
        super()
        this.props = props
        this.tagName = tag
        this.debugName = tag
        this.bodyFN = body
    }

    destroy(): void {
        this.cleanEvents(this.events)
        super.destroy()
    }

    get _compareId(): string {
        return `${this.type}-${this.debugName}-${this.tagName}`
    }

    checkIfChanged(sporp: StaticProps): boolean {
        let changed = false
        const propsSig = JSON.stringify(this.props)
        const sporpSig = JSON.stringify(sporp)
        if (propsSig !== sporpSig) {
            changed = true
        }
        return changed
    }

    static createText(text: string): StaticComponent {
        const comp = new StaticComponent("text", {}, text)
        comp.type = "text"
        return comp
    }

    // MARK: Events

    onChange(): void {
        this.parent?.onChange()
    }

    // MARK: Attributes

    attr(key: string, value: string): this {
        this.props[key] = value
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const anyNode = this.node as any
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const anyValue = value as any
        if (anyNode) {
            switch (key) {
                case "class":
                    anyNode.className = value
                    break
                case "value":
                    anyNode.value = value
                    break
                case "style":
                    if (anyValue instanceof Object) {
                        for (const k in anyValue) {
                            anyNode.style[k] = anyValue[k]
                        }
                    }
                    break
                default:
                    anyNode.setAttribute(key, value)
            }
        }
        return this
    }

    className(name: string): this {
        if (this.node instanceof HTMLElement) {
            this.node.classList.add(name)
            this.props.class = this.node.className
        } else {
            let cn = this.props.class ?? ""
            if (cn) {
                cn += " "
            }
            cn += name
            this.props.class = cn
        }
        return this
    }

    on(eventName: string, fn: (e: Event) => void): this {
        if (this.events[eventName]) {
            document.removeEventListener(eventName, this.events[eventName])
        }
        this.events[eventName] = (e: Event) => {
            if (
                this.node instanceof Node &&
                (e.target === this.node || this.node.contains(e.target as Node))
            ) {
                console.log("on: handler", this.debugName, eventName)
                fn(e)
            }
        }
        document.addEventListener(eventName, this.events[eventName])
        return this
    }

    cleanEvents(events: StaticEvents) {
        for (const eventName in events) {
            if (events[eventName]) {
                document.removeEventListener(eventName, events[eventName])
            }
        }
    }

    css(style: string, value: string): this {
        if (this.node instanceof HTMLElement) {
            this.node.style.setProperty(style, value)
        }
        if (this.type !== "text") {
            const hnode = this.node as HTMLElement | null
            const sp: StaticProps = hnode?.style ?? {}
            sp[style] = value
            this.props.style = sp
        }

        return this
    }

    value<T>(value: string | Ref<T>): this {
        if (this.tagName === "input") {
            if (value instanceof Ref) {
                this.attr("value", value.value as string)
                this.on("input", (e: Event) => {
                    const inputTarget = e.target as HTMLInputElement
                    if (value instanceof Ref) {
                        value.value = inputTarget.value as T
                    }
                })
            } else {
                this.attr("value", value)
            }
        }
        return this
    }

    render() {
        if (this.node === null || this.needsUpdate) {
            this.needsUpdate = false
            if (this.tagName === "text") {
                let text: string
                if (typeof this.bodyFN === "string") {
                    text = this.bodyFN
                } else {
                    text = ""
                }
                this.node = document.createTextNode(text)
            } else {
                if (this.node === null) {
                    this.node = document.createElement(this.tagName)
                }
                // update node with props
                for (const key in this.props) {
                    this.attr(key, this.props[key])
                }
                if (typeof this.bodyFN === "function") {
                    const currentRoot = getRoot()
                    const prevChildren = this.children
                    this.children = []
                    setRoot(this)
                    this.bodyFN()
                    setRoot(currentRoot)

                    for (let i = 0; i < this.children.length; i++) {
                        const child = this.children[i]
                        let prev: BaseComponent | null = null
                        if (prevChildren.length > i) {
                            prev = prevChildren[i]
                        }

                        if (prev?._compareId === child._compareId) {
                            child.node = prev.node
                            child.children = prev.children
                            child.needsUpdate = true
                            prev.destroy()
                        }
                    }
                }
            }
        }
        super.render()
    }
}
