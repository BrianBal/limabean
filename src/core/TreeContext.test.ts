import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import BaseComponent from "./BaseComponent"
import { getRoot, push, setRoot } from "./TreeContext"

// Mock BaseComponent
vi.mock("./BaseComponent", () => {
  return {
    default: class MockBaseComponent {
      children: MockBaseComponent[] = []
      push(child: MockBaseComponent) {
        this.children.push(child)
      }
    },
  }
})

describe("TreeContext", () => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let consoleSpy: any

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {})
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  describe("setRoot", () => {
    it("should set the global context", () => {
      const root = new BaseComponent()
      setRoot(root)
      expect(getRoot()).toBe(root)
    })
  })

  describe("getRoot", () => {
    it("should set the global context", () => {
      const root = new BaseComponent()
      setRoot(root)
      expect(getRoot()).toBe(root)
    })
  })

  describe("push", () => {
    it("should push a child component and return a pop function", () => {
      const root = new BaseComponent()
      const child = new BaseComponent()
      setRoot(root)
      const pop = push(child)

      expect(getRoot()).toBe(child)

      pop()

      expect(getRoot()).toBe(root)
      expect(root.children.length).toBe(1)
      expect(root.children[0]).toBe(child)
    })

    it("should push a child component with autoAppendChildren set to false", () => {
      const root = new BaseComponent()
      const child = new BaseComponent()
      setRoot(root)

      const pop = push(child, false)

      expect(getRoot()).toBe(child)

      pop()

      expect(root.children.length).toBe(0)
    })

    it("should handle pushing when global context is null", () => {
      const child = new BaseComponent()
      setRoot(null)
      const pop = push(child)

      expect(getRoot()).toBe(child)

      pop()

      expect(getRoot()).toBe(null)
    })

    it("should handle nesting", () => {
      const root = new BaseComponent()
      const a = new BaseComponent()
      const b = new BaseComponent()
      const c = new BaseComponent()

      const render = (c: BaseComponent, fn: (() => void) | null) => {
        const pop = push(c)
        if (fn) {
          fn()
        }
        pop()
      }

      setRoot(root)
      render(a, () => {
        render(b, () => {
          render(c, null)
        })
      })

      expect(root.children.length).toBe(1)
      expect(root.children[0]).toBe(a)
      expect(a.children.length).toBe(1)
      expect(a.children[0]).toBe(b)
      expect(b.children.length).toBe(1)
      expect(b.children[0]).toBe(c)
      expect(c.children.length).toBe(0)
    })
  })
})
