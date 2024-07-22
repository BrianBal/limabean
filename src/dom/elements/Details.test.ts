import { describe, expect, it, vi } from "vitest"
import ContainerTag from "./ContainerTag"
import Details from "./Details"

// Mock the ContainerTag function
vi.mock("./ContainerTag", () => ({
    default: vi.fn((tag, body) => ({ tag, body })),
}))

describe("Details", () => {
    it("should create a details tag with valid input", () => {
        const mockBody = vi.fn()
        const result = Details(mockBody)

        expect(ContainerTag).toHaveBeenCalledWith("details", mockBody)
        expect(result).toEqual({ tag: "details", body: mockBody })
    })

    it("should handle an empty function as input", () => {
        const emptyBody = () => {}
        const result = Details(emptyBody)

        expect(ContainerTag).toHaveBeenCalledWith("details", emptyBody)
        expect(result).toEqual({ tag: "details", body: emptyBody })
    })
})
