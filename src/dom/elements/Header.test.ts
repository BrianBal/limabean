import { describe, expect, it, vi } from "vitest"
import ContainerTag from "./ContainerTag"
import Header from "./Header"

// Mock the ContainerTag function
vi.mock("./ContainerTag", () => ({
    default: vi.fn((tag, body) => ({ tag, body })),
}))

describe("Header", () => {
    it("should create a header tag with valid input", () => {
        const mockBody = vi.fn()
        const result = Header(mockBody)

        expect(ContainerTag).toHaveBeenCalledWith("header", mockBody)
        expect(result).toEqual({ tag: "header", body: mockBody })
    })
})
