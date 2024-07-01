import { type BaseComponent, RootComponent } from "../core"

export default function startLimabean(
    rootEl: HTMLElement,
    rootComp: BaseComponent
) {
    const root = new RootComponent(rootEl)
    rootComp.parent = root
    root.children = [rootComp]
    root.render()
}
