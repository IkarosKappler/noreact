/**
 * A function to create the root element of a NoReact app.
 *
 * @author  Ikaros Kappler
 * @version 1.0.0
 * @date    2025-06-25
 */
import { ClickHandlerNames } from "./interfaces";
import { Ref } from "./useRef";
export const _createElement = (name, props, ...content) => {
    //   console.log("_createElement", name);
    // console.log("_createElement, content:", content);
    props = props || {};
    const newNode = document.createElement(name);
    _addAttributes(newNode, props);
    _addContent(newNode, content);
    return newNode;
};
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
const _addAttribute = (node, key, value) => {
    // console.log("key", key, "value", props[key]);
    const keyLow = key.toLocaleLowerCase();
    if (keyLow === "classname") {
        node.setAttribute("class", `${value}`);
    }
    else if (key === "style") {
        // console.log("Assigning styles", value);
        if (typeof value === "object") {
            Object.assign(node.style, value);
        }
        else {
            console.warn(`Cannot assign CSS properties of type ${typeof value}. Please use an object with CSS mappings.`);
        }
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
    else if (keyLow.length > 2 && keyLow.startsWith("on") && ClickHandlerNames.includes(keyLow)) {
        //   console.log("Adding listener for ", key, value);
        // This is probably a function
        // Remove the 'on' part
        var eventName = keyLow.substring(2);
        node.addEventListener(eventName, value);
    }
    else {
        node.setAttribute(`${key}`, `${value}`);
    }
};
//# sourceMappingURL=createElement.js.map