import { Tag } from "../../core"
import type { StaticComponent } from "../../core"

type TextAreaProps = {
    [key: string]: string
}

/**
 * Create a textarea  tag that accepts long text input
 *
 * @export
 * @param {TextAreaProps} props
 * @return {*}  {StaticComponent}
 */
export default function Input(props: TextAreaProps | null = null): StaticComponent {
    const tag = Tag("textarea", props)
    return tag
}
