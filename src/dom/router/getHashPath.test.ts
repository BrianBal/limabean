import { describe, expect, it } from "vitest"
import getHashPath from "./getHashPath"

describe("getHashPath", () => {
    it("should return / for empty hash", () => {
        const base = ""
        const location = {} as Location
        const path = getHashPath(base, location)
        expect(path).toBe("/")
    })
    it("should make sure the path starts with a /", () => {
        const base = ""
        const location = { hash: "#tacos" } as Location
        const path = getHashPath(base, location)
        expect(path).toBe("/tacos")
    })
    it("should return the path", () => {
        const base = ""
        const location = { hash: "#/tacos/" } as Location
        const path = getHashPath(base, location)
        expect(path).toBe("/tacos")
    })
    it("should return a longer path", () => {
        const base = ""
        const location = { hash: "#/tacos/are/great/" } as Location
        const path = getHashPath(base, location)
        expect(path).toBe("/tacos/are/great")
    })
    it("should remove the base from the path", () => {
        const base = "/tacos/"
        const location = { hash: "#/tacos/are/great/" } as Location
        const path = getHashPath(base, location)
        expect(path).toBe("/are/great")
    })
    it("should not include query string", () => {
        const base = "/tacos/"
        const location = {
            hash: "#/tacos/are/great/?testing=123&foo=bar",
        } as Location
        const path = getHashPath(base, location)
        expect(path).toBe("/are/great")
    })
})
