/**
 * A function to create the root element of a NoReact app.
 *
 * @author  Ikaros Kappler
 * @version 1.0.0
 * @date    2025-06-25
 */
export class RootNode {
    constructor(rootHtmlElement) {
        this.rootHtmlNode = rootHtmlElement;
    }
    render(content) {
        this.rootHtmlNode.appendChild(content);
    }
}
export const _createRoot = (rootHtmlElement) => {
    return new RootNode(rootHtmlElement);
};
//# sourceMappingURL=createRoot.js.map