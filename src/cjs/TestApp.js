"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestApp = void 0;
var NoReact_1 = require("./NoReact");
var TestApp = function (name) {
    var click1 = function () {
        console.log("First clicked");
    };
    var click2 = function () {
        console.log("Second clicked");
    };
    var mouseEnter = function (event) {
        event.target.style["background-color"] = "grey";
    };
    var mouseOut = function (event) {
        event.target.style["background-color"] = "DeepSkyBlue";
    };
    return (NoReact_1.default.createElement("div", { className: "NoReact-main", style: { padding: "3em", mx: "2em", my: 0 } },
        "Hello ",
        name,
        NoReact_1.default.createElement("div", { className: "NoReact-child-1", onClick: click1 }, "Hello Nested"),
        NoReact_1.default.createElement("div", { className: "NoReact-child-2", onClick: click2, onMouseEnter: mouseEnter, onMouseOut: mouseOut, style: { backgroundColor: "yellow" } }, "Hello Nested 2"),
        NoReact_1.default.createElement("div", null, ["A", "B", "C"].map(function (text) {
            return NoReact_1.default.createElement("div", null, text);
        }))));
};
exports.TestApp = TestApp;
//# sourceMappingURL=TestApp.js.map