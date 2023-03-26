"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var stores_1 = require("./stores");
var utils_1 = require("./utils");
var utils_2 = require("./utils");
var Animator = function (props) {
    var children = props.children, animation = props.animation, style = props.style, className = props.className, callBack = props.callBack;
    var _a = (0, react_1.useContext)(stores_1.ScrollDataContext), currentPage = _a.currentPage, currentProgress = _a.currentProgress;
    var page = (0, react_1.useContext)(stores_1.ScrollPageContext).page;
    var _b = (0, react_1.useState)(true), isSSR = _b[0], setIsSSR = _b[1];
    var isFinished = true ? (!isSSR && currentPage !== page - 1 && currentPage !== page) : false;
    var thisPageProgress = (currentPage !== -1 && currentPage === page) ? currentProgress : currentPage > page ? 1 : 0;
    var data = { progress: (isFinished) ? 1 : currentProgress, page: currentPage, isFinished: isFinished, isThisPage: currentPage === page, thisPageProgress: thisPageProgress };
    (0, utils_2.callback)(callBack, data);
    (0, react_1.useEffect)(function () { return (typeof window !== "undefined" ? setIsSSR(false) : undefined); }, []);
    var calculatedStyle = (0, react_1.useMemo)(function () {
        return isSSR
            ? style
            : currentPage === page // for current (out)
                ? __assign(__assign({}, (0, utils_1.computeStyle)(animation === null || animation === void 0 ? void 0 : animation.keyframes, (isFinished) ? 1 : currentProgress)), style)
                : { display: 'none' };
    }, [
        isSSR,
        currentPage,
        page,
        animation === null || animation === void 0 ? void 0 : animation.keyframes,
        currentProgress,
        style
    ]);
    return (react_1.default.createElement("div", { suppressHydrationWarning: true, style: calculatedStyle, className: className }, children));
};
exports.default = Animator;
