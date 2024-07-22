import { describe, expect, it, vi } from "vitest"
import Article from "./Article"
import ContainerTag from "./ContainerTag"

// Mock the ContainerTag function
vi.mock("./ContainerTag", () => ({
    default: vi.fn((tag, body) => ({ tag, body })),
}))

describe("Article", () => {
    it("should create an article tag with valid input", () => {
        const mockBody = vi.fn()
        const result = Article(mockBody)

        expect(ContainerTag).toHaveBeenCalledWith("article", mockBody)
        expect(result).toEqual({ tag: "article", body: mockBody })
    })
})
