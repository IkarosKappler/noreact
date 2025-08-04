"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRef = exports.Ref = void 0;
var Ref = /** @class */ (function () {
    function Ref(value) {
        this.current = value;
    }
    return Ref;
}());
exports.Ref = Ref;
var useRef = function () {
    return new Ref(undefined);
};
exports.useRef = useRef;
//# sourceMappingURL=useRef.js.map