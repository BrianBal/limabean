import type BTBaseComponent from "./BTBaseComponent"

let globalContext: BTBaseComponent | null = null
let prevGlobalContext: BTBaseComponent | null = null

export const setPrevRoot = (root: BTBaseComponent) => {
    prevGlobalContext = root
}

export const getPrevRoot = (): BTBaseComponent | null => {
    return prevGlobalContext
}

/**
 * Get the root component
 *
 * @export
 * @return {*}  {(BTBaseComponent | null)}
 */
export const getRoot = (): BTBaseComponent | null => {
    return globalContext
}

/**
 * Set the root component
 *
 * @export
 * @param {BTBaseComponent} root
 */
export const setRoot = (root: BTBaseComponent) => {
    globalContext = root
}

/**
 * Push a child component
 *
 * @export
 * @param {BTBaseComponent} child
 * @param {boolean} [autoAppendChildren=true]
 * @return {function} pop function to run after rendering
 */
export const push = (
    child: BTBaseComponent,
    autoAppendChildren = true,
): (() => void) => {
    const prev = globalContext
    globalContext = child
    // let debug = false
    // if (prev?.children.length > 0) {
    //     debug = true
    // }

    // pop
    return () => {
        globalContext = prev
        if (autoAppendChildren && globalContext) {
            const childIndex = globalContext.children.findIndex(
                (c) => c.id === child.id,
            )

            // if (debug) {
            //     console.log("pop ---")
            //     console.log("pop childIndex", child.debugName, childIndex)
            //     console.log(
            //         "pop children",
            //         child.debugName,
            //         globalContext.children,
            //     )
            // }

            child.parent = globalContext
            if (childIndex === -1) {
                globalContext.children.push(child)
            } else {
                globalContext.children[childIndex] = child
            }
        }
    }
}
