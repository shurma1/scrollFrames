"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callback = exports.computeStyle = exports.SimpleInterpolation = exports.environment = void 0;
var computeStyle_1 = __importDefault(require("./computeStyle"));
exports.computeStyle = computeStyle_1.default;
var callback_1 = __importDefault(require("./callback"));
exports.callback = callback_1.default;
var environment_1 = __importDefault(require("./environment"));
exports.environment = environment_1.default;
var interpolation_1 = require("./interpolation");
Object.defineProperty(exports, "SimpleInterpolation", { enumerable: true, get: function () { return interpolation_1.SimpleInterpolation; } });
