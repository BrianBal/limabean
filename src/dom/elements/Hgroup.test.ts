import { describe, expect, it, vi } from "vitest"
import ContainerTag from "./ContainerTag"
import HGroup from "./Hgroup"

// Mock the ContainerTag function
vi.mock("./ContainerTag", () => ({
    default: vi.fn((tag, body) => ({ tag, body })),
}))

describe("HGroup", () => {
    it("should create an hgroup tag with valid input", () => {
        const mockBody = vi.fn()
        const result = HGroup(mockBody)

        expect(ContainerTag).toHaveBeenCalledWith("hgroup", mockBody)
        expect(result).toEqual({ tag: "hgroup", body: mockBody })
    })
})
