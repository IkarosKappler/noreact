"use strict";
/**
 * A function to create the root element of a NoReact app.
 *
 * @author  Ikaros Kappler
 * @version 1.0.0
 * @date    2025-06-25
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._createRoot = exports.RootNode = void 0;
var RootNode = /** @class */ (function () {
    function RootNode(rootHtmlElement) {
        this.rootHtmlNode = rootHtmlElement;
    }
    RootNode.prototype.render = function (content) {
        this.rootHtmlNode.appendChild(content);
    };
    return RootNode;
}());
exports.RootNode = RootNode;
var _createRoot = function (rootHtmlElement) {
    return new RootNode(rootHtmlElement);
};
exports._createRoot = _createRoot;
//# sourceMappingURL=createRoot.js.map