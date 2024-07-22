import { describe, expect, it, vi } from "vitest"
import ContainerTag from "./ContainerTag"
import FieldSet from "./FieldSet"

// Mock the ContainerTag function
vi.mock("./ContainerTag", () => ({
    default: vi.fn((tag, body) => ({ tag, body })),
}))

describe("FieldSet", () => {
    it("should create a fieldset tag with valid input", () => {
        const mockBody = vi.fn()
        const result = FieldSet(mockBody)

        expect(ContainerTag).toHaveBeenCalledWith("fieldset", mockBody)
        expect(result).toEqual({ tag: "fieldset", body: mockBody })
    })

    it("should handle an empty function as input", () => {
        const emptyBody = () => {}
        const result = FieldSet(emptyBody)

        expect(ContainerTag).toHaveBeenCalledWith("fieldset", emptyBody)
        expect(result).toEqual({ tag: "fieldset", body: emptyBody })
    })
})
