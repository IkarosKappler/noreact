/**
 * A function to create the root element of a NoReact app.
 *
 * @author  Ikaros Kappler
 * @version 1.0.0
 * @date    2025-06-25
 */
export declare class RootNode {
    private rootHtmlNode;
    constructor(rootHtmlElement: HTMLElement);
    render(content: HTMLElement): void;
}
export declare const _createRoot: (rootHtmlElement: HTMLElement) => RootNode;
