import { describe, expect, it, vi } from "vitest"
import Aside from "./Aside"
import ContainerTag from "./ContainerTag"

// Mock the ContainerTag function
vi.mock("./ContainerTag", () => ({
    default: vi.fn((tag, body) => ({ tag, body })),
}))

describe("Aside", () => {
    it("should create an aside tag with valid input", () => {
        const mockBody = vi.fn()
        const result = Aside(mockBody)

        expect(ContainerTag).toHaveBeenCalledWith("aside", mockBody)
        expect(result).toEqual({ tag: "aside", body: mockBody })
    })

    it("should handle empty function as input", () => {
        const emptyBody = () => {}
        const result = Aside(emptyBody)

        expect(ContainerTag).toHaveBeenCalledWith("aside", emptyBody)
        expect(result).toEqual({ tag: "aside", body: emptyBody })
    })
})
