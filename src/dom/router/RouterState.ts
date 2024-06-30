let globalRouterState = "/"

export const getRouterPath = (): string => {
    return globalRouterState
}

export const setRouterPath = (path: string): void => {
    globalRouterState = path
}
