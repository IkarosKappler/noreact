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

  /**
   * In this implementation rendering just means to append the built JSX result to the DOM node.
   * @param {HTMLElement} content
   */
  render(content: HTMLElement) {
    this.rootHtmlNode.appendChild(content);
  }
}

export const _createRoot = (rootHtmlElement: HTMLElement) => {
  return new RootNode(rootHtmlElement);
};
