import { describe, it, expect, vi } from "vitest"
import A from "./A"
import TextTag from "./TextTag"

// Mock the TextTag component
vi.mock("./TextTag", () => ({
  default: vi.fn(() => ({
    attr: vi.fn(),
    on: vi.fn(),
  })),
}))

describe("A component", () => {
  it("should create an anchor tag with href and onClick", () => {
    const href = "https://example.com"
    const body = "Click me"
    const onClick = vi.fn()

    const result = A(href, body, onClick)

    expect(TextTag).toHaveBeenCalledWith("a", body)
    expect(result.attr).toHaveBeenCalledWith("href", href)
    expect(result.on).toHaveBeenCalledWith("click", onClick)
  })

  it("should create an anchor tag without href", () => {
    const body = "No link"

    const result = A(null, body)

    expect(TextTag).toHaveBeenCalledWith("a", body)
    expect(result.attr).not.toHaveBeenCalled()
    expect(result.on).not.toHaveBeenCalled()
  })

  it("should create an anchor tag without onClick", () => {
    const href = "https://example.com"
    const body = "Just a link"

    const result = A(href, body)

    expect(TextTag).toHaveBeenCalledWith("a", body)
    expect(result.attr).toHaveBeenCalledWith("href", href)
    expect(result.on).not.toHaveBeenCalled()
  })

  it("should handle different types of body content", () => {
    const href = "https://example.com"
    const stringBody = "String content"
    const blockBody = () => "Block content"

    A(href, stringBody)
    expect(TextTag).toHaveBeenCalledWith("a", stringBody)

    A(href, blockBody)
    expect(TextTag).toHaveBeenCalledWith("a", blockBody)
  })

  it("should handle empty string as href", () => {
    const href = ""
    const body = "Empty href"

    const result = A(href, body)

    expect(TextTag).toHaveBeenCalledWith("a", body)
    expect(result.attr).not.toHaveBeenCalledWith("href", href)
  })

  it("should handle empty body", () => {
    const href = "https://example.com"
    const emptyBody = ""

    A(href, emptyBody)

    expect(TextTag).toHaveBeenCalledWith("a", emptyBody)
  })
})
