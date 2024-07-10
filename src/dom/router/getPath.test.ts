import { describe, expect, it } from "vitest"
import getPath from "./getPath"

describe("getPath", () => {
  it("should return / for empty path", () => {
    const base = ""
    const location = {
      pathname: "",
    } as Location
    const path = getPath(base, location)
    expect(path).toBe("/")
  })
  it("should make sure the path starts with a /", () => {
    const base = ""
    const location = { pathname: "/tacos" } as Location
    const path = getPath(base, location)
    expect(path).toBe("/tacos")
  })
  it("should return the path", () => {
    const base = ""
    const location = { pathname: "/tacos/" } as Location
    const path = getPath(base, location)
    expect(path).toBe("/tacos")
  })
  it("should return a longer path", () => {
    const base = ""
    const location = { pathname: "/tacos/are/great/" } as Location
    const path = getPath(base, location)
    expect(path).toBe("/tacos/are/great")
  })
  it("should remove the base from the path", () => {
    const base = "/tacos/"
    const location = { pathname: "/tacos/are/great/" } as Location
    const path = getPath(base, location)
    expect(path).toBe("/are/great")
  })
  it("should not include query string", () => {
    const base = "/tacos/"
    const location = {
      pathname: "/tacos/are/great/?testing=123&foo=bar",
    } as Location
    const path = getPath(base, location)
    expect(path).toBe("/are/great")
  })
})
