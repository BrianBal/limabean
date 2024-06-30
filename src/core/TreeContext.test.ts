import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { setRoot, push, getRoot } from "./TreeContext"
import BTBaseComponent from "./BTBaseComponent"

// Mock BTBaseComponent
vi.mock("./BTBaseComponent", () => {
    return {
        default: class MockBTBaseComponent {
            children: MockBTBaseComponent[] = []
            push(child: MockBTBaseComponent) {
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
            const root = new BTBaseComponent()
            setRoot(root)
            expect(getRoot()).toBe(root)
        })
    })

    describe("getRoot", () => {
        it("should set the global context", () => {
            const root = new BTBaseComponent()
            setRoot(root)
            expect(getRoot()).toBe(root)
        })
    })

    describe("push", () => {
        it("should push a child component and return a pop function", () => {
            const root = new BTBaseComponent()
            const child = new BTBaseComponent()
            setRoot(root)
            const pop = push(child)

            expect(getRoot()).toBe(child)

            pop()

            expect(getRoot()).toBe(root)
            expect(root.children.length).toBe(1)
            expect(root.children[0]).toBe(child)
        })

        it("should push a child component with autoAppendChildren set to false", () => {
            const root = new BTBaseComponent()
            const child = new BTBaseComponent()
            setRoot(root)

            const pop = push(child, false)

            expect(getRoot()).toBe(child)

            pop()

            expect(root.children.length).toBe(0)
        })

        it("should handle pushing when global context is null", () => {
            const child = new BTBaseComponent()
            setRoot(null)
            const pop = push(child)

            expect(getRoot()).toBe(child)

            pop()

            expect(getRoot()).toBe(null)
        })

        it("should handle nesting", () => {
            const root = new BTBaseComponent()
            const a = new BTBaseComponent()
            const b = new BTBaseComponent()
            const c = new BTBaseComponent()

            const render = (c: BTBaseComponent, fn: (() => void) | null) => {
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

        it("should handle nesting with mutiple children on level", () => {
            const root = new BTBaseComponent()
            const a = new BTBaseComponent()
            const aa = new BTBaseComponent()
            const b = new BTBaseComponent()
            const ba = new BTBaseComponent()
            const bb = new BTBaseComponent()
            const c = new BTBaseComponent()

            const render = (c: BTBaseComponent, fn: (() => void) | null) => {
                const pop = push(c)
                if (fn) {
                    fn()
                }
                pop()
            }

            setRoot(root)
            render(a, () => {
                render(aa, () => {})
            })
            render(b, () => {
                render(ba, null)
                render(bb, null)
            })
            render(c, null)

            expect(root.children.length).toBe(3)
            expect(root.children[0]).toBe(a)
            expect(root.children[1]).toBe(b)
            expect(root.children[2]).toBe(c)

            expect(a.children.length).toBe(1)
            expect(a.children[0]).toBe(aa)

            expect(b.children.length).toBe(2)
            expect(b.children[0]).toBe(ba)
            expect(b.children[1]).toBe(bb)

            expect(c.children.length).toBe(0)
        })
    })
})
