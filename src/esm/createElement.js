/**
 * A function to create the root element of a NoReact app.
 *
 * @author  Ikaros Kappler
 * @version 1.0.0
 * @date    2025-06-25
 */
import { ClickHandlerNames } from "./interfaces";
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
export const _createElement = (name, props, ...content) => {
    props = props || {};
    const newNode = document.createElement(name);
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
const _addContent = (node, ...content) => {
    if (!content || !Array.isArray(content)) {
        return;
    }
    content.forEach((child) => {
        if (typeof child === "undefined") {
            return;
        }
        if (Array.isArray(child)) {
            _addContent(node, ...child);
        }
        else if (typeof child === "string") {
            node.append(child);
        }
        else {
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
const _addAttributes = (node, props) => {
    Object.keys(props).forEach((key) => {
        // console.log("key", key, "value", props[key]);
        if (!key) {
            return; // Ignore empty keys
        }
        else {
            const value = props[key];
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
const _addAttribute = (node, key, value) => {
    if (!key) {
        return;
    }
    const keyLow = key.toLocaleLowerCase();
    if (keyLow === "classname") {
        node.setAttribute("class", `${value}`);
    }
    else if (key === "style" || key === "sx") {
        _applyStyles(node, value);
    }
    else if (key === "ref") {
        if (!(value instanceof Ref)) {
            console.warn("Warning, passed object is not a ref.");
        }
        if (!value.current) {
            value.current = node;
        }
        // No real attribute
    }
    else if (keyLow.length > 5 && keyLow.startsWith("data-")) {
        const dataKey = key.substring(5);
        const dataKeyCamelCased = camelize(dataKey);
        // console.log("Handling data attribute", dataKey);
        // console.log("Applying data set key", "dataKey", dataKey, "dataKeyCamelCased", dataKeyCamelCased, value);
        if (typeof value !== "string") {
            console.warn(`Warning, passed object is not a string. Cannot set data attribute '${dataKey}'.`);
        }
        else if (value.length === 0) {
            console.warn(`Warning, passed value is empty. Cannot set data attribute '${dataKey}'.`);
        }
        else {
            node.dataset[dataKeyCamelCased] = value;
            // console.log("Node data set", node.dataset);
        }
    }
    else if (keyLow.length > 2 && keyLow.startsWith("on") && ClickHandlerNames.includes(keyLow)) {
        // This is probably a function
        // Remove the 'on' part
        const eventName = keyLow.substring(2);
        node.addEventListener(eventName, value);
    }
    else {
        node.setAttribute(`${key}`, `${value}`);
    }
};
/**
 * Kebab-case to camelCase.
 *
 * See
 *    https://stackoverflow.com/questions/57556471/convert-kebab-case-to-camelcase-with-javascript
 */
const camelize = (str) => {
    let arr = str.split("-");
    let capital = arr.map((item, index) => (index ? item.charAt(0).toUpperCase() + item.slice(1) : item));
    // ^-- change here.
    let capitalString = capital.join("");
    // console.log(capitalString);
    return capitalString;
};
/**
 * Apply styles and respect mini-styles.
 *
 * @param {HTMLElement} node - The node to add the attribute to.
 * @param {string | Function | CSSStyleSheet | Ref<HTMLElement | undefined>} value - The attribute's stylesheet value.
 */
const _applyStyles = (node, value) => {
    if (typeof value === "object") {
        // Unwind mini-styles
        const finalStyles = new CSSStyleSheet();
        const keys = Object.keys(value);
        keys.forEach((key) => {
            switch (key) {
                // Paddings
                case "p":
                    finalStyles[PADDING_LEFT] = value[key];
                    finalStyles[PADDING_RIGHT] = value[key];
                    finalStyles[PADDING_TOP] = value[key];
                    finalStyles[PADDING_BOTTOM] = value[key];
                    break;
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
                case "m":
                    finalStyles[MARGIN_LEFT] = value[key];
                    finalStyles[MARGIN_RIGHT] = value[key];
                    finalStyles[MARGIN_TOP] = value[key];
                    finalStyles[MARGIN_BOTTOM] = value[key];
                    break;
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
                case "pos":
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
    }
    else {
        console.warn(`Cannot assign CSS properties of type ${typeof value}. Please use an object with CSS mappings.`);
    }
};
//# sourceMappingURL=createElement.js.map