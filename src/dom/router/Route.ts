import { component } from "../../core"
import { getRouterPath } from "./RouterState"

type RouteParams = {
    [key: string]: string
}
type RouteBodyFn = (match: RouteParams) => void

type RouteProps = {
    // path could be like /home for a static route
    // or /home/:id for a dynamic route
    path: string
    body: RouteBodyFn
}

const Route = component<RouteProps>(
    (render, props, ctx) => {
        const routerPath = getRouterPath()
        let matched = false
        let params: RouteParams = {}

        // Convert route pattern to regex
        const escapeRegex = (str: string) =>
            str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1")
        const paramRegex = /:(\w+)/g
        const routeRegex = new RegExp(
            `^${props.path.replace(
                paramRegex,
                (_, paramName) => `(?<${paramName}>[^/]+)`
            )}(?:/|$)`
        )

        // Check if the current path matches the route pattern
        const match = routerPath.match(routeRegex)
        if (match) {
            matched = true
            params = match.groups || {}
        }

        render(() => {
            // Only render if path matches
            if (matched) {
                props.body(params)
            }
        })
    },
    null,
    "Route"
)

export default Route
