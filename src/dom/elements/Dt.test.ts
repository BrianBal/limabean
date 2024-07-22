import { describe, expect, it, vi } from "vitest"
import ContainerTag from "./ContainerTag"
import Dt from "./Dt"

// Mock the ContainerTag function
vi.mock("./ContainerTag", () => ({
    default: vi.fn((tag, body) => ({ tag, body })),
}))

describe("Dt", () => {
    it("should create a dt tag with valid input", () => {
        const mockBody = vi.fn()
        const result = Dt(mockBody)

        expect(ContainerTag).toHaveBeenCalledWith("Dt", mockBody)
        expect(result).toEqual({ tag: "Dt", body: mockBody })
    })

    it("should handle an empty function as input", () => {
        const emptyBody = () => {}
        const result = Dt(emptyBody)

        expect(ContainerTag).toHaveBeenCalledWith("Dt", emptyBody)
        expect(result).toEqual({ tag: "Dt", body: emptyBody })
    })
})
