"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoReact = void 0;
var TestApp_1 = require("./TestApp");
var createElement_1 = require("./createElement");
var createRoot_1 = require("./createRoot");
var useRef_1 = require("./useRef");
exports.NoReact = {
    createRoot: createRoot_1._createRoot,
    createElement: createElement_1._createElement,
    useRef: useRef_1.useRef,
    TestApp: TestApp_1.TestApp
};
exports.default = exports.NoReact;
//# sourceMappingURL=NoReact.js.map