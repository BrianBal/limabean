import { describe, expect, it, vi } from "vitest"
import ContainerTag from "./ContainerTag"
import Form from "./Form"

// Mock the ContainerTag function
vi.mock("./ContainerTag", () => ({
    default: vi.fn((tag, body) => ({ tag, body })),
}))

describe("Form", () => {
    it("should create a form tag with valid input", () => {
        const mockBody = vi.fn()
        const result = Form(mockBody)

        expect(ContainerTag).toHaveBeenCalledWith("form", mockBody)
        expect(result).toEqual({ tag: "form", body: mockBody })
    })
})
