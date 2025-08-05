"use strict";
/**
 * A function to create the root element of a NoReact app.
 *
 * @author  Ikaros Kappler
 * @version 1.0.0
 * @date    2025-06-25
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._createElement = void 0;
var interfaces_1 = require("./interfaces");
var useRef_1 = require("./useRef");
/**
 * The main function to create new elements from their JSX defintion.
 *
 * @param {string} name - The node name, like 'div' or 'button' or 'p'.
 * @param {ElementProps} props - The attribte mapping to apply to the new node, like 'className', 'style', 'id'.
 * @param {IElementContent...} content - The node's content.
 * @returns
 */
var _createElement = function (name, props) {
    var content = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        content[_i - 2] = arguments[_i];
    }
    props = props || {};
    var newNode = document.createElement(name);
    _addAttributes(newNode, props);
    _addContent(newNode, content);
    return newNode;
};
exports._createElement = _createElement;
/**
 * A private helper function to add content to a newly created node.
 *
 * @param {HTMLElement} node - The node to add content to.
 * @param {IElementContent...} content - The content to add.
 * @returns
 */
var _addContent = function (node) {
    var content = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        content[_i - 1] = arguments[_i];
    }
    if (!content || !Array.isArray(content)) {
        return;
    }
    content.forEach(function (child) {
        if (typeof child === "undefined") {
            return;
        }
        if (Array.isArray(child)) {
            _addContent.apply(void 0, __spreadArray([node], child, false));
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
var _addAttributes = function (node, props) {
    Object.keys(props).forEach(function (key) {
        // console.log("key", key, "value", props[key]);
        if (!key) {
            return; // Ignore empty keys
        }
        else {
            var value = props[key];
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
var _addAttribute = function (node, key, value) {
    if (!key) {
        return;
    }
    var keyLow = key.toLocaleLowerCase();
    if (keyLow === "classname") {
        node.setAttribute("class", "".concat(value));
    }
    else if (key === "style") {
        if (typeof value === "object") {
            Object.assign(node.style, value);
        }
        else {
            console.warn("Cannot assign CSS properties of type ".concat(typeof value, ". Please use an object with CSS mappings."));
        }
    }
    else if (key === "ref") {
        if (!(value instanceof useRef_1.Ref)) {
            console.warn("Warning, passed object is not a ref.");
        }
        if (!value.current) {
            value.current = node;
        }
        // No real attribute
    }
    else if (keyLow.length > 2 && keyLow.startsWith("on") && interfaces_1.ClickHandlerNames.includes(keyLow)) {
        // This is probably a function
        // Remove the 'on' part
        var eventName = keyLow.substring(2);
        node.addEventListener(eventName, value);
    }
    else {
        node.setAttribute("".concat(key), "".concat(value));
    }
};
//# sourceMappingURL=createElement.js.map