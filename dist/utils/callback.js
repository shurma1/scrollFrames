"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var callback = function (func) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    if (func !== undefined) {
        var entire = func.toString();
        var body = entire.slice(entire.indexOf("{") + 1, entire.lastIndexOf("}"));
        var userFunction = new Function('data', body);
        userFunction.apply(void 0, params);
    }
};
exports.default = callback;
