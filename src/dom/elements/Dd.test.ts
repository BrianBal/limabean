import { describe, expect, it, vi } from "vitest"
import ContainerTag from "./ContainerTag"
import Dd from "./Dd"

// Mock the ContainerTag function
vi.mock("./ContainerTag", () => ({
    default: vi.fn((tag, body) => ({ tag, body })),
}))

describe("Dd", () => {
    it("should create a dd tag with valid input", () => {
        const mockBody = vi.fn()
        const result = Dd(mockBody)

        expect(ContainerTag).toHaveBeenCalledWith("Dd", mockBody)
        expect(result).toEqual({ tag: "Dd", body: mockBody })
    })

    it("should work with an empty function as input", () => {
        const emptyBody = () => {}
        const result = Dd(emptyBody)

        expect(ContainerTag).toHaveBeenCalledWith("Dd", emptyBody)
        expect(result).toEqual({ tag: "Dd", body: emptyBody })
    })
})
