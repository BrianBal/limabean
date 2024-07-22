import type { StaticComponent } from "../../core"
import TextTag, { type TextTagBody } from "./TextTag"

/**
 * create a th tag
 *
 * @export
 * @param {ContainerTagBody} body
 * @return {*}  {StaticComponent}
 */
export default function TH(body: TextTagBody): StaticComponent {
    return TextTag("th", body)
}
