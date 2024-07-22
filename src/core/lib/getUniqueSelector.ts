export default function getUniqueSelector(element: HTMLElement): string {
    if (!(element instanceof HTMLElement)) {
        throw new Error("The argument must be an HTMLElement")
    }

    const path: string[] = []
    let currentElement: HTMLElement | null = element

    while (currentElement && currentElement !== document.body) {
        let selector = currentElement.tagName.toLowerCase()

        if (currentElement.id) {
            selector += `#${currentElement.id}`
            path.unshift(selector)
            break
        }
        let sibling: Element | null = currentElement
        let siblingIndex = 1

        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        while ((sibling = sibling.previousElementSibling)) {
            if (sibling.tagName === currentElement.tagName) {
                siblingIndex++
            }
        }

        if (siblingIndex > 1) {
            selector += `:nth-of-type(${siblingIndex})`
        }

        path.unshift(selector)
        currentElement = currentElement.parentElement
    }

    return path.join(" > ")
}
