import Txt from "./Txt"
import { Tag, type BTStaticComponent } from "../../core"
import type { TagBodyFN } from "../../core"

export type TextTagBody = string | TagBodyFN | null

/**
 * A helper method to create a tag that generally has mostly text content.
 *
 * @export
 * @param {string} tag
 * @param {TextTagBody} [body=null]
 * @return {*}  {BTStaticComponent}
 */
export default function TextTag(tag: string, body: TextTagBody = null): BTStaticComponent {
    let bodyFn: TagBodyFN | null
    switch (typeof body) {
        case "function":
            bodyFn = body
            break
        case "string":
            bodyFn = () => {
                Txt(body)
            }
            break
        default:
            bodyFn = null
            break
    }
    return Tag(tag, {}, bodyFn)
}
