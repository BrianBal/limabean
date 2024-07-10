import { createRef } from "../../core/Ref"
const globalRouterState = createRef("/", "globalRouterState")

export const getRouterPath = (): string => {
  return globalRouterState.value
}

export const setRouterPath = (path: string): void => {
  globalRouterState.value = path
}
