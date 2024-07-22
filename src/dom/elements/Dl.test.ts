import { describe, expect, it, vi } from "vitest"
import ContainerTag from "./ContainerTag"
import Dl from "./Dl"

// Mock the ContainerTag function
vi.mock("./ContainerTag", () => ({
    default: vi.fn((tag, body) => ({ tag, body })),
}))

describe("Dl", () => {
    it("should create a dl tag with valid input", () => {
        const mockBody = vi.fn()
        const result = Dl(mockBody)

        expect(ContainerTag).toHaveBeenCalledWith("dl", mockBody)
        expect(result).toEqual({ tag: "dl", body: mockBody })
    })

    it("should handle empty function as input", () => {
        const emptyBody = () => {}
        const result = Dl(emptyBody)

        expect(ContainerTag).toHaveBeenCalledWith("dl", emptyBody)
        expect(result).toEqual({ tag: "dl", body: emptyBody })
    })
})
