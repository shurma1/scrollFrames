"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isIntoGap = function (a, b, n) {
    var total = a - n + b;
    return (total > a && total < b) || (total < a && total > b);
};
var coef = function (scrollPosition, styleValue, nextStyleValue, key, nextKey) {
    return styleValue + ((nextStyleValue - styleValue) * (scrollPosition - key / 100) * (100 / (nextKey - key)));
};
var computeStyle = function (styles) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    var computedStyle = {};
    var animateStyle = {};
    var animateTransformStyle = {};
    var staticStyle = {};
    var staticTransformStyle = {};
    var staticStyleConsructor = function (styleName, value, procent, isTransfrom) {
        if (isTransfrom) {
            if (typeof (staticTransformStyle[styleName]) === 'undefined') {
                staticTransformStyle[styleName] = {
                    start: {
                        value: '',
                        procent: 0
                    },
                    end: {
                        value: '',
                        procent: 0
                    }
                };
                staticTransformStyle[styleName].start.value = value;
                staticTransformStyle[styleName].start.procent = procent;
            }
            if (staticTransformStyle[styleName].end.procent < procent * 100) {
                staticTransformStyle[styleName].end.value = value;
                staticTransformStyle[styleName].end.procent = procent;
            }
        }
        else {
            if (typeof (staticStyle[styleName]) === 'undefined') {
                staticStyle[styleName] = {
                    start: {
                        value: '',
                        procent: 0
                    },
                    end: {
                        value: '',
                        procent: 0
                    }
                };
                staticStyle[styleName].start.value = value;
                staticStyle[styleName].start.procent = procent;
            }
            if (staticStyle[styleName].end.procent < procent * 100) {
                staticStyle[styleName].end.value = value;
                staticStyle[styleName].end.procent = procent;
            }
        }
    };
    var styleConstructor = function (styleName, from, to, key, nextKey, scrollPosition) {
        var units = {
            'px': { isInteger: true },
            'em': { inInteger: false },
            '%': { isInteger: false },
            'vh': { isInteger: false },
            'vw': { isInteger: false }
        };
        var thisUnit;
        Object.keys(units).forEach(function (curentValue) {
            if (from.includes(curentValue)) {
                thisUnit = curentValue;
            }
        });
        if (typeof (thisUnit) === 'undefined')
            thisUnit = '';
        from = from.replace(String(thisUnit), '');
        to = to.replace(String(thisUnit), '');
        if (styleName === 'transform') {
            var fromStyleValue = from.split('(')[1].split(')')[0];
            var toStyleValue = to.split('(')[1].split(')')[0];
            if (typeof (animateTransformStyle[from.split('(')[0]]) === 'undefined') {
                animateTransformStyle[from.split('(')[0]] = {
                    from: 0,
                    to: 100,
                    value: ''
                };
            }
            if (animateTransformStyle[from.split('(')[0]]['to'] - animateTransformStyle[from.split('(')[0]]['from'] >= parseInt(nextKey) - parseInt(key)) {
                animateTransformStyle[from.split('(')[0]]['value'] = "".concat(coef(scrollPosition, Number(fromStyleValue), Number(toStyleValue), Number(key), Number(nextKey))).concat(thisUnit);
                animateTransformStyle[from.split('(')[0]]['from'] = parseInt(key);
                animateTransformStyle[from.split('(')[0]]['to'] = parseInt(nextKey);
            }
        }
        else {
            if (typeof (animateStyle[styleName]) === 'undefined') {
                animateStyle[styleName] = {
                    from: 0,
                    to: 100,
                    value: ''
                };
            }
            if (animateStyle[styleName]['to'] - animateStyle[styleName]['from'] >= parseInt(nextKey) - parseInt(key)) {
                animateStyle[styleName]['value'] = "".concat(coef(scrollPosition, Number(from), Number(to), Number(key), Number(nextKey))).concat(thisUnit);
                animateStyle[styleName]['from'] = parseInt(key);
                animateStyle[styleName]['to'] = parseInt(nextKey);
            }
        }
    };
    if (typeof (styles) !== 'undefined') {
        for (var _a = 0, _b = Object.entries(styles); _a < _b.length; _a++) {
            var _c = _b[_a], key = _c[0], value = _c[1];
            for (var _d = 0, _e = Object.entries(value); _d < _e.length; _d++) {
                var _f = _e[_d], styleName = _f[0], styleArray = _f[1];
                if (typeof (styleArray) == 'object' && styleArray !== null) {
                    for (var _g = 0, _h = Object.entries(styleArray); _g < _h.length; _g++) {
                        var _j = _h[_g], index = _j[0], styleValue = _j[1];
                        for (var _k = 0, _l = Object.entries(styles); _k < _l.length; _k++) {
                            var _m = _l[_k], nextKey = _m[0], nextValue = _m[1];
                            for (var _o = 0, _p = Object.entries(nextValue); _o < _p.length; _o++) {
                                var _q = _p[_o], nextStyleName = _q[0], nextStyleArray = _q[1];
                                if (typeof (nextStyleArray) == 'object' && nextStyleArray !== null) {
                                    for (var _r = 0, _s = Object.entries(nextStyleArray); _r < _s.length; _r++) {
                                        var _t = _s[_r], index_1 = _t[0], nextStyleValue = _t[1];
                                        if (Number(nextKey) - Number(key) > 0 && styleName === nextStyleName) {
                                            if (typeof (styleValue) === 'string' && typeof (nextStyleValue) === 'string') {
                                                if (isIntoGap(Number(key) / 100, Number(nextKey) / 100, params[0])) {
                                                    if (styleName === 'transform') {
                                                        if (styleValue.split('(')[0] === nextStyleValue.split('(')[0]) {
                                                            styleConstructor(styleName, styleValue, nextStyleValue, key, nextKey, params[0]);
                                                        }
                                                    }
                                                    else {
                                                        styleConstructor(styleName, styleValue, nextStyleValue, key, nextKey, params[0]);
                                                    }
                                                }
                                                else {
                                                    if (styleName === 'transform' && nextStyleName === 'transform') {
                                                        if (styleValue.split('(')[0] === nextStyleValue.split('(')[0]) {
                                                            staticStyleConsructor(styleValue.split('(')[0], styleValue.split('(')[1].split(')')[0], Number(key), true);
                                                            staticStyleConsructor(nextStyleValue.split('(')[0], nextStyleValue.split('(')[1].split(')')[0], Number(nextKey), true);
                                                        }
                                                    }
                                                    else {
                                                        staticStyleConsructor(styleName, styleValue, Number(key), false);
                                                        staticStyleConsructor(nextStyleName, nextStyleValue, Number(nextKey), false);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    for (var _u = 0, _v = Object.entries(staticStyle); _u < _v.length; _u++) {
        var _w = _v[_u], key = _w[0], value = _w[1];
        if (Number(value['start']['procent']) / 100 > params[0]) {
            computedStyle[key] = value['start']['value'];
        }
        if (Number(value['end']['procent']) / 100 < params[0]) {
            computedStyle[key] = value['end']['value'];
        }
    }
    for (var _x = 0, _y = Object.entries(animateStyle); _x < _y.length; _x++) {
        var _z = _y[_x], key = _z[0], value = _z[1];
        computedStyle[key] = value['value'];
    }
    for (var _0 = 0, _1 = Object.entries(staticTransformStyle); _0 < _1.length; _0++) {
        var _2 = _1[_0], key = _2[0], value = _2[1];
        if (typeof (animateTransformStyle[key]) === 'undefined') {
            if (Number(value['start']['procent']) / 100 > params[0]) {
                animateTransformStyle[key] = { value: value['start']['value'] };
            }
            if (Number(value['end']['procent']) / 100 < params[0]) {
                animateTransformStyle[key] = { value: value['end']['value'] };
            }
        }
    }
    var transform = '';
    for (var _3 = 0, _4 = Object.entries(animateTransformStyle); _3 < _4.length; _3++) {
        var _5 = _4[_3], key = _5[0], value = _5[1];
        transform += "".concat(key, "(").concat(value['value'], ")");
    }
    computedStyle['transform'] = transform;
    return computedStyle;
};
exports.default = computeStyle;
