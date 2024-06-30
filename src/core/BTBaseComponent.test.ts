import { describe, it, expect, vi, beforeEach } from "vitest"
import BTBaseComponent from "./BTBaseComponent"
import BTStaticComponent from "./BTStaticComponent"

// Mock getUniqueId
vi.mock("./lib/getUniqueId", () => ({
    default: vi.fn(() => "mock-id"),
}))

describe("BTBaseComponent", () => {
    let component: BTBaseComponent

    beforeEach(() => {
        component = new BTBaseComponent()
    })

    it("should initialize with default values", () => {
        expect(component.id).toBe("mock-id")
        expect(component.type).toBe("static")
        expect(component.debugName).toBe("BTBaseComponent")
        expect(component.node).toBeNull()
        expect(component.parent).toBeNull()
        expect(component.children).toEqual([])
        expect(component.hasDirtyChildren).toBe(false)
        expect(component.changeListeners).toEqual([])
        expect(component._usePlaceholder).toBe(false)
        expect(component.placeholderElement).toBeNull()
        expect(component._exclude).toBe(false)
    })

    describe("Children management", () => {
        it("should add children correctly", () => {
            const child1 = new BTBaseComponent()
            const child2 = new BTBaseComponent()
            component.addChildren([child1, child2])

            expect(component.children).toHaveLength(2)
            expect(component.children[0]).toBe(child1)
            expect(component.children[1]).toBe(child2)
            expect(child1.parent).toBe(component)
            expect(component.hasDirtyChildren).toBe(true)
        })

        it("should propagate dirty state to parent", () => {
            const parent = new BTBaseComponent()
            component.parent = parent
            component.hasDirtyChildren = true

            expect(parent.hasDirtyChildren).toBe(true)
        })
    })

    describe("Event handling", () => {
        it("should add and remove event listeners", () => {
            const listener = vi.fn()
            component.addEventListener("change", listener)
            expect(component.changeListeners).toContain(listener)

            component.removeEventListener("change", listener)
            expect(component.changeListeners).not.toContain(listener)
        })

        it("should trigger change listeners and propagate to parent", () => {
            const listener = vi.fn()
            const parentListener = vi.fn()
            const parent = new BTBaseComponent()
            parent.addEventListener("change", parentListener)
            component.parent = parent
            component.addEventListener("change", listener)

            component.onChange()

            expect(listener).toHaveBeenCalled()
            expect(parentListener).toHaveBeenCalled()
        })
    })

    describe("Rendering", () => {
        it("should render static components", () => {
            const mockNode = document.createElement("div")
            component.node = mockNode
            const child = new BTBaseComponent()
            child.node = document.createElement("span")
            component.addChildren([child])

            component.render()

            expect(mockNode.children[0]).toBe(child.node)
        })

        it("should render text nodes", () => {
            const mockNode = document.createElement("div")
            component.node = mockNode
            const child = BTStaticComponent.createText("Hello")
            component.addChildren([child])

            component.render()

            expect(mockNode.textContent).toBe("Hello")
        })

        it("should handle functional components", () => {
            const mockNode = document.createElement("div")
            component.node = mockNode
            const functionalComponent = new BTBaseComponent()
            functionalComponent.type = "functional"
            const childOfFunctional = new BTBaseComponent()
            childOfFunctional.node = document.createElement("span")
            functionalComponent.addChildren([childOfFunctional])
            component.addChildren([functionalComponent])

            component.render()

            expect(mockNode.children[0]).toBe(childOfFunctional.node)
        })

        it("should handle functional components with placeholder", () => {
            const mockNode = document.createElement("div")
            component.node = mockNode
            const functionalComponent = new BTBaseComponent()
            functionalComponent.type = "functional"
            const placeholder = new BTBaseComponent()
            placeholder.node = document.createElement("span")
            functionalComponent.placeholderComponent(placeholder)
            component.addChildren([functionalComponent])

            component.render()

            expect(mockNode.children[0]).toBe(placeholder.node)
        })

        it("should skip excluded components", () => {
            const mockNode = document.createElement("div")
            component.node = mockNode
            const excludedChild = new BTBaseComponent()
            excludedChild.exclude(true)
            component.addChildren([excludedChild])

            component.render()

            expect(mockNode.children.length).toBe(0)
        })

        it("should not render if no node is available", () => {
            const consoleWarnSpy = vi
                .spyOn(console, "warn")
                .mockImplementation(() => {})
            component.render()
            expect(consoleWarnSpy).not.toHaveBeenCalled()
        })
    })

    describe("Utility methods", () => {
        it("should set debug name", () => {
            component.setDebugName("TestComponent")
            expect(component.debugName).toBe("TestComponent")
        })

        it("should set placeholder component", () => {
            const placeholder = new BTBaseComponent()
            component.placeholderComponent(placeholder)
            expect(component._usePlaceholder).toBe(true)
            expect(component.placeholderElement).toBe(placeholder)
        })

        it("should set exclude flag", () => {
            component.exclude(true)
            expect(component._exclude).toBe(true)
        })
    })
})
