import { getRoot } from "./TreeContext"
import getUniqueId from "./lib/getUniqueId"

export class Ref<T> {
    _id: string
    name: string
    _value: T

    constructor(value: T) {
        this._id = getUniqueId()
        this._value = value
    }

    get value(): T {
        const root = getRoot()
        if (root) {
            root.registerRef(this)
        }
        return this._value
    }
    set value(value: T) {
        if (this._value !== value) {
            this._value = value
            document.dispatchEvent(new CustomEvent("ref-change", { detail: this }))
        }
    }
}

export function createRef<T>(initialValue: T, name: string): Ref<T> {
    const root = getRoot()
    let ref: Ref<T> | null
    if (root && name) {
        ref = root._scopedRefs[name] as Ref<T> | null
    }

    if (!ref) {
        ref = new Ref(initialValue)
        if (root && name) {
            root._scopedRefs[name] = ref
        }
    }
    return ref
}
