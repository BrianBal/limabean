import { type BTBaseComponent, BTRootComponent } from "../core"

export default function startLimabean(
    rootEl: HTMLElement,
    rootComp: BTBaseComponent
) {
    const root = new BTRootComponent(rootEl)
    rootComp.parent = root
    root.children = [rootComp]
    root.render()
}
