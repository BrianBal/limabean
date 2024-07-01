import { Tag } from "../../core"
import type { StaticComponent } from "../../core"

type InputType =
    | "text"
    | "password"
    | "checkbox"
    | "radio"
    | "number"
    | "file"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "range"
    | "search"
    | "tel"
    | "time"
    | "url"
    | "week"

type InputTagProps = {
    [key: string]: string
}

/**
 * Create a containerish tag that mainly groups other tags
 *
 * @export
 * @param {string} tag
 * @param {ContainerTagBody} body
 * @return {*}  {StaticComponent}
 */
export default function Input(
    type: InputType,
    props: InputTagProps | null = null
): StaticComponent {
    let attr: InputTagProps = { type }
    if (props) {
        attr = { ...attr, ...props }
    }
    const tag = Tag("input", attr)
    return tag
}
