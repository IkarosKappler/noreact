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
var PADDING_LEFT = "padding-left";
var PADDING_RIGHT = "padding-right";
var PADDING_TOP = "padding-top";
var PADDING_BOTTOM = "padding-bottom";
var MARGIN_LEFT = "margin-left";
var MARGIN_RIGHT = "margin-right";
var MARGIN_TOP = "margin-top";
var MARGIN_BOTTOM = "margin-bottom";
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
        _applyStyles(node, value);
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
/**
 * Apply styles and respect mini-styles.
 *
 * @param {HTMLElement} node - The node to add the attribute to.
 * @param {string | Function | CSSStyleSheet | Ref<HTMLElement | undefined>} value - The attribute's stylesheet value.
 */
var _applyStyles = function (node, value) {
    if (typeof value === "object") {
        // Unwind mini-styles
        var finalStyles_1 = new CSSStyleSheet();
        var keys = Object.keys(value);
        keys.forEach(function (key) {
            switch (key) {
                // Paddings
                case "p":
                    finalStyles_1[PADDING_LEFT] = value[key];
                    finalStyles_1[PADDING_RIGHT] = value[key];
                    finalStyles_1[PADDING_TOP] = value[key];
                    finalStyles_1[PADDING_BOTTOM] = value[key];
                    break;
                case "px":
                    finalStyles_1[PADDING_LEFT] = value[key];
                    finalStyles_1[PADDING_RIGHT] = value[key];
                    break;
                case "py":
                    finalStyles_1[PADDING_TOP] = value[key];
                    finalStyles_1[PADDING_BOTTOM] = value[key];
                    break;
                case "pt":
                    finalStyles_1[PADDING_TOP] = value[key];
                    break;
                case "pb":
                    finalStyles_1[PADDING_BOTTOM] = value[key];
                    break;
                case "pl":
                    finalStyles_1[PADDING_LEFT] = value[key];
                    break;
                case "pr":
                    finalStyles_1[PADDING_RIGHT] = value[key];
                    break;
                // Margins
                case "m":
                    finalStyles_1[MARGIN_LEFT] = value[key];
                    finalStyles_1[MARGIN_RIGHT] = value[key];
                    finalStyles_1[MARGIN_TOP] = value[key];
                    finalStyles_1[MARGIN_BOTTOM] = value[key];
                    break;
                case "mx":
                    finalStyles_1[MARGIN_LEFT] = value[key];
                    finalStyles_1[MARGIN_RIGHT] = value[key];
                    break;
                case "my":
                    finalStyles_1[MARGIN_TOP] = value[key];
                    finalStyles_1[MARGIN_BOTTOM] = value[key];
                    break;
                case "mt":
                    finalStyles_1[MARGIN_TOP] = value[key];
                    break;
                case "mb":
                    finalStyles_1[MARGIN_BOTTOM] = value[key];
                    break;
                case "ml":
                    finalStyles_1[MARGIN_LEFT] = value[key];
                    break;
                case "mr":
                    finalStyles_1[MARGIN_RIGHT] = value[key];
                    break;
                // Display
                case "d":
                    finalStyles_1["display"] = value[key];
                    break;
                // Flex-Direction
                case "fd":
                    finalStyles_1["flex-direction"] = value[key];
                    break;
                // Visibility
                case "v":
                    finalStyles_1["visibility"] = value[key];
                    break;
                // Position
                case "pos":
                    finalStyles_1["position"] = value[key];
                    break;
                // Left
                case "l":
                    finalStyles_1["left"] = value[key];
                    break;
                // Right
                case "l":
                    finalStyles_1["right"] = value[key];
                    break;
                // Top
                case "t":
                    finalStyles_1["top"] = value[key];
                    break;
                // Tottom
                case "b":
                    finalStyles_1["bottom"] = value[key];
                    break;
                // Width
                case "w":
                    finalStyles_1["width"] = value[key];
                    break;
                // Height
                case "h":
                    finalStyles_1["height"] = value[key];
                    break;
                default:
                    finalStyles_1[key] = value[key];
            }
        });
        // Object.assign(node.style, value);
        Object.assign(node.style, finalStyles_1);
    }
    else {
        console.warn("Cannot assign CSS properties of type ".concat(typeof value, ". Please use an object with CSS mappings."));
    }
};
//# sourceMappingURL=createElement.js.map