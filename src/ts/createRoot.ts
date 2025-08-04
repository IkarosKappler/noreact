/**
 * A function to create the root element of a NoReact app.
 *
 * @author  Ikaros Kappler
 * @version 1.0.0
 * @date    2025-06-25
 */

export class RootNode {
  private rootHtmlNode: HTMLElement;

  constructor(rootHtmlElement: HTMLElement) {
    this.rootHtmlNode = rootHtmlElement;
  }

  render(content: HTMLElement) {
    this.rootHtmlNode.appendChild(content);
  }
}

export const _createRoot = (rootHtmlElement: HTMLElement) => {
  return new RootNode(rootHtmlElement);
};
