import type { BTComponentContext } from "../../core/FunctionalComponent"

export type RouterHistory = {
  back: () => void
  forward: () => void
  push: (path: string) => void
  replace: (path: string) => void
}

export default function getHistory(ctx: BTComponentContext): RouterHistory {
  return {
    back: () => {
      window.history.back()
    },
    forward: () => {
      window.history.forward()
    },
    push: (link: string) => {
      const base = ctx.get<string>("Router.base") ?? ""
      const useHashRoutes = ctx.get<boolean>("Router.useHashRoutes") ?? false

      const path = base + link

      if (useHashRoutes) {
        window.location.hash = `#${path}`
      } else {
        history.pushState({ now: Date.now() }, "", path)
      }
    },
    replace: (link: string) => {
      const base = ctx.get<string>("Router.base") ?? ""
      const useHashRoutes = ctx.get<boolean>("Router.useHashRoutes") ?? false

      const path = base + link

      if (useHashRoutes) {
        window.location.hash = `#${path}`
      } else {
        history.replaceState({ now: Date.now() }, "", path)
      }
    },
  }
}
