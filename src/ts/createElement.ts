/**
 * A function to create the root element of a NoReact app.
 *
 * @author  Ikaros Kappler
 * @version 1.0.0
 * @date    2025-06-25
 */

import { ClickHandlerNames, ElementProps, IElementContent } from "./interfaces";
import { Ref } from "./useRef";

const PADDING_LEFT = "padding-left";
const PADDING_RIGHT = "padding-right";
const PADDING_TOP = "padding-top";
const PADDING_BOTTOM = "padding-bottom";
const MARGIN_LEFT = "margin-left";
const MARGIN_RIGHT = "margin-right";
const MARGIN_TOP = "margin-top";
const MARGIN_BOTTOM = "margin-bottom";

/**
 * The main function to create new elements from their JSX defintion.
 *
 * @param {string} name - The node name, like 'div' or 'button' or 'p'.
 * @param {ElementProps} props - The attribte mapping to apply to the new node, like 'className', 'style', 'id'.
 * @param {IElementContent...} content - The node's content.
 * @returns
 */
export const _createElement = (name: string, props: ElementProps, ...content: IElementContent) => {
  props = props || {};

  const newNode: HTMLElement = document.createElement(name);
  _addAttributes(newNode, props);
  _addContent(newNode, content);
  return newNode;
};

/**
 * A private helper function to add content to a newly created node.
 *
 * @param {HTMLElement} node - The node to add content to.
 * @param {IElementContent...} content - The content to add.
 * @returns
 */
const _addContent = (node: HTMLElement, ...content: IElementContent): void => {
  if (!content || !Array.isArray(content)) {
    return;
  }
  content.forEach((child: string | HTMLElement) => {
    if (typeof child === "undefined") {
      return;
    }
    if (Array.isArray(child)) {
      _addContent(node, ...child);
    } else if (typeof child === "string") {
      node.append(child);
    } else {
      // console.log("HTMLElement child", typeof child, child);
      node.appendChild(child);
    }
  });
};

/**
 * Apply node attribute (properties) to a newly created node.
 *
 * @param {HTMLElement} node - The node to apply the properties/attributes to.
 * @param {ElementProps} props - The attribute set.
 */
const _addAttributes = (node: HTMLElement, props: ElementProps) => {
  Object.keys(props).forEach((key: string) => {
    // console.log("key", key, "value", props[key]);
    if (!key) {
      return; // Ignore empty keys
    } else {
      const value: string | Function | CSSStyleSheet | Ref<HTMLElement | undefined> = props[key];
      _addAttribute(node, key, value);
    }
  });
};

/**
 * Adds a single attribute to the newly created node.
 *
 * @param {HTMLElement} node - The node to add the attribute to.
 * @param {string} key - The attribute name, like 'className', 'style', 'id'.
 * @param {string | Function | CSSStyleSheet | Ref<HTMLElement | undefined>} value - The attribute's value.
 */
const _addAttribute = (
  node: HTMLElement,
  key: string,
  value: string | Function | CSSStyleSheet | Ref<HTMLElement | undefined>
) => {
  if (!key) {
    return;
  }
  const keyLow: string = key.toLocaleLowerCase();
  if (keyLow === "classname") {
    node.setAttribute("class", `${value}`);
  } else if (key === "style") {
    _applyStyles(node, value);
  } else if (key === "ref") {
    if (!(value instanceof Ref)) {
      console.warn("Warning, passed object is not a ref.");
    }
    if (!(value as Ref<HTMLElement | undefined>).current) {
      (value as Ref<HTMLElement | undefined>).current = node;
    }
    // No real attribute
  } else if (keyLow.length > 2 && keyLow.startsWith("on") && ClickHandlerNames.includes(keyLow)) {
    // This is probably a function
    // Remove the 'on' part
    var eventName = keyLow.substring(2);
    node.addEventListener(eventName, value as EventListenerOrEventListenerObject);
  } else {
    node.setAttribute(`${key}`, `${value}`);
  }
};

/**
 * Apply styles and respect mini-styles.
 *
 * @param {HTMLElement} node - The node to add the attribute to.
 * @param {string | Function | CSSStyleSheet | Ref<HTMLElement | undefined>} value - The attribute's stylesheet value.
 */
const _applyStyles = (node: HTMLElement, value: string | Function | CSSStyleSheet | Ref<HTMLElement | undefined>) => {
  if (typeof value === "object") {
    // Unwind mini-styles
    const finalStyles: CSSStyleSheet = new CSSStyleSheet();
    const keys = Object.keys(value);
    keys.forEach((key: string) => {
      switch (key) {
        // Paddings
        case "px":
          finalStyles[PADDING_LEFT] = value[key];
          finalStyles[PADDING_RIGHT] = value[key];
          break;
        case "py":
          finalStyles[PADDING_TOP] = value[key];
          finalStyles[PADDING_BOTTOM] = value[key];
          break;
        case "pt":
          finalStyles[PADDING_TOP] = value[key];
          break;
        case "pb":
          finalStyles[PADDING_BOTTOM] = value[key];
          break;
        case "pl":
          finalStyles[PADDING_LEFT] = value[key];
          break;
        case "pr":
          finalStyles[PADDING_RIGHT] = value[key];
          break;
        // Margins
        case "mx":
          finalStyles[MARGIN_LEFT] = value[key];
          finalStyles[MARGIN_RIGHT] = value[key];
          break;
        case "my":
          finalStyles[MARGIN_TOP] = value[key];
          finalStyles[MARGIN_BOTTOM] = value[key];
          break;
        case "mt":
          finalStyles[MARGIN_TOP] = value[key];
          break;
        case "mb":
          finalStyles[MARGIN_BOTTOM] = value[key];
          break;
        case "ml":
          finalStyles[MARGIN_LEFT] = value[key];
          break;
        case "mr":
          finalStyles[MARGIN_RIGHT] = value[key];
          break;
        // Display
        case "d":
          finalStyles["display"] = value[key];
          break;
        // Flex-Direction
        case "fd":
          finalStyles["flex-direction"] = value[key];
          break;
        // Visibility
        case "v":
          finalStyles["visibility"] = value[key];
          break;
        // Position
        case "p":
          finalStyles["position"] = value[key];
          break;
        // Left
        case "l":
          finalStyles["left"] = value[key];
          break;
        // Right
        case "l":
          finalStyles["right"] = value[key];
          break;
        // Top
        case "t":
          finalStyles["top"] = value[key];
          break;
        // Tottom
        case "b":
          finalStyles["bottom"] = value[key];
          break;
        // Width
        case "w":
          finalStyles["width"] = value[key];
          break;
        // Height
        case "h":
          finalStyles["height"] = value[key];
          break;
        default:
          finalStyles[key] = value[key];
      }
    });
    // Object.assign(node.style, value);
    Object.assign(node.style, finalStyles);
  } else {
    console.warn(`Cannot assign CSS properties of type ${typeof value}. Please use an object with CSS mappings.`);
  }
};
