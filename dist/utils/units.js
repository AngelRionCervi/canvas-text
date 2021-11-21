"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullTextHeight = exports.getUnderlineHeight = exports.getPositionInPx = exports.convertUnitInPx = void 0;
var constants_1 = require("../constants");
var convertRemToPixels = function (rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};
var getValueAndUnit = function (str) {
    var _a, _b, _c, _d;
    var valueRegex = /[+-]?\d+(\.\d+)?/g;
    var unitRegex = /[a-zA-Z]+/g;
    var value = parseFloat((_b = (_a = str.match(valueRegex)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : "0");
    var unit = ((_d = (_c = str.match(unitRegex)) === null || _c === void 0 ? void 0 : _c[0]) !== null && _d !== void 0 ? _d : "px");
    return [value, unit];
};
var convertUnitInPx = function (valueAndUnit) {
    if (typeof valueAndUnit === "number")
        return valueAndUnit;
    var _a = getValueAndUnit(valueAndUnit), value = _a[0], unit = _a[1];
    var unitMap = {
        rem: convertRemToPixels,
        px: function (val) { return val; },
    };
    return unitMap[unit](value);
};
exports.convertUnitInPx = convertUnitInPx;
var getPositionInPx = function (position, fontSize) {
    return [position.x, position.y].map(function (pos, index) { return (0, exports.convertUnitInPx)(pos) + (index ? fontSize : 0); });
};
exports.getPositionInPx = getPositionInPx;
var getUnderlineHeight = function (fontSizeInPx, bold) {
    return fontSizeInPx / (bold ? constants_1.BOLD_UNDERLINE_DIVIDER : constants_1.REGULAR_UNDERLINE_DIVIDER);
};
exports.getUnderlineHeight = getUnderlineHeight;
var getFullTextHeight = function (fontSizeInPx, underline, bold) {
    if (!underline)
        return fontSizeInPx;
    return fontSizeInPx + constants_1.UNDERLINE_DISTANCE_FROM_BOTTOM + (0, exports.getUnderlineHeight)(fontSizeInPx, bold);
};
exports.getFullTextHeight = getFullTextHeight;
//# sourceMappingURL=units.js.map