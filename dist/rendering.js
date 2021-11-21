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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTextBuffer = void 0;
var constants_1 = require("./constants");
var listeners_1 = require("./listeners");
var buffer_1 = require("./utils/buffer");
var units_1 = require("./utils/units");
var defaultCommonStyles = {
    position: { x: "0px", y: "0px" },
    underline: false,
    bold: false,
    italic: false,
    color: "#f00",
    font: "Arial",
    fontSize: "30px",
};
var renderUnderline = function (ctx, _a, textWidth, fontSizeInPx, bold) {
    var x = _a.x, y = _a.y;
    ctx.fillRect(x, y + constants_1.UNDERLINE_DISTANCE_FROM_BOTTOM, textWidth, (0, units_1.getUnderlineHeight)(fontSizeInPx, bold));
};
var renderTextNode = function (ctx, textNode, defaultStyles, renderer) {
    var value = textNode.value, nodeStyles = textNode.styles, listeners = __rest(textNode, ["value", "styles"]);
    var styles = __assign(__assign({}, defaultStyles), nodeStyles);
    var position = styles.position, color = styles.color, font = styles.font, fontSize = styles.fontSize, bold = styles.bold, italic = styles.italic, underline = styles.underline;
    var fontSizeInPx = (0, units_1.convertUnitInPx)(fontSize);
    var _a = (0, units_1.getPositionInPx)(position, fontSizeInPx), x = _a[0], y = _a[1];
    ctx.font = "" + (bold ? "bold " : "") + (italic ? "italic " : "") + fontSizeInPx + "px " + font;
    ctx.fillStyle = color;
    ctx.fillText(value, x, y);
    var textWidth = ctx.measureText(value).width;
    if (underline) {
        renderUnderline(ctx, { x: x, y: y }, textWidth, fontSizeInPx, bold);
    }
    if (listeners) {
        if (!renderer) {
            throw new Error("You must provide a renderer argument to createTextBuffer to use listeners (onClick, onMouseEnter, onMouseLeave)");
        }
        (0, listeners_1.handleListeners)(listeners, { x: x, y: y }, renderer, textWidth, fontSizeInPx, underline, bold);
    }
};
var createTextBuffer = function (width, height, options, renderer) {
    var _a = (0, buffer_1.createBuffer)(width, height), canvas = _a.canvas, ctx = _a.ctx;
    var textNodes = options.textNodes, commonStyles = options.commonStyles;
    var defaultStyles = __assign(__assign({}, defaultCommonStyles), commonStyles);
    textNodes.forEach(function (textNode) {
        renderTextNode(ctx, textNode, defaultStyles, renderer);
    });
    return canvas;
};
exports.createTextBuffer = createTextBuffer;
//# sourceMappingURL=rendering.js.map