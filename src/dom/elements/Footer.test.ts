import { describe, expect, it, vi } from "vitest"
import type { StaticComponent } from "../../core"
import ContainerTag from "./ContainerTag"
import Footer from "./Footer"

// Mock the ContainerTag function
vi.mock("./ContainerTag", () => ({
    default: vi.fn((tag, body) => ({ tag, body })),
}))

describe("Footer", () => {
    it("should create a footer tag with valid input", () => {
        const mockBody = vi.fn()
        const result = Footer(mockBody)

        expect(ContainerTag).toHaveBeenCalledWith("footer", mockBody)
        expect(result).toEqual({ tag: "footer", body: mockBody })
    })

    it("should handle an empty function as body", () => {
        const emptyBody = () => {}
        const result = Footer(emptyBody)

        expect(ContainerTag).toHaveBeenCalledWith("footer", emptyBody)
        expect(result).toEqual({ tag: "footer", body: emptyBody })
    })
})
