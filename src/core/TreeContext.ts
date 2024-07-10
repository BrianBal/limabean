import type BaseComponent from "./BaseComponent"

let globalContext: BaseComponent | null = null
let prevGlobalContext: BaseComponent | null = null

export const setPrevRoot = (root: BaseComponent) => {
  prevGlobalContext = root
}

export const getPrevRoot = (): BaseComponent | null => {
  return prevGlobalContext
}

/**
 * Get the root component
 *
 * @export
 * @return {*}  {(BaseComponent | null)}
 */
export const getRoot = (): BaseComponent | null => {
  return globalContext
}

/**
 * Set the root component
 *
 * @export
 * @param {BaseComponent} root
 */
export const setRoot = (root: BaseComponent) => {
  globalContext = root
}

/**
 * Push a child component
 *
 * @export
 * @param {BaseComponent} child
 * @param {boolean} [autoAppendChildren=true]
 * @return {function} pop function to run after rendering
 */
export const push = (child: BaseComponent, autoAppendChildren = true): (() => void) => {
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
      const childIndex = globalContext.children.findIndex((c) => c.id === child.id)

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
