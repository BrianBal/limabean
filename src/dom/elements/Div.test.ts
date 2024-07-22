import { describe, expect, it, vi } from "vitest"
import ContainerTag from "./ContainerTag"
import Div from "./Div"

// Mock the ContainerTag function
vi.mock("./ContainerTag", () => ({
    default: vi.fn((tag, body) => ({ tag, body })),
}))

describe("Div", () => {
    it("should create a div tag with valid input", () => {
        const mockBody = vi.fn()
        const result = Div(mockBody)

        expect(ContainerTag).toHaveBeenCalledWith("div", mockBody)
        expect(result).toEqual({ tag: "div", body: mockBody })
    })

    it("should handle an empty function as input", () => {
        const emptyBody = () => {}
        const result = Div(emptyBody)

        expect(ContainerTag).toHaveBeenCalledWith("div", emptyBody)
        expect(result).toEqual({ tag: "div", body: emptyBody })
    })
})
