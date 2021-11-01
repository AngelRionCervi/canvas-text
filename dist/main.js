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
define("types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("utils/buffer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createBuffer = void 0;
    var createBuffer = function (width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        return { canvas: canvas, ctx: ctx };
    };
    exports.createBuffer = createBuffer;
});
define("utils/unitConversion", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.convertUnitInPx = void 0;
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
        if (typeof valueAndUnit === 'number')
            return valueAndUnit;
        var _a = getValueAndUnit(valueAndUnit), value = _a[0], unit = _a[1];
        var unitMap = {
            rem: convertRemToPixels,
            px: function (val) { return val; },
        };
        return unitMap[unit](value);
    };
    exports.convertUnitInPx = convertUnitInPx;
});
define("main", ["require", "exports", "utils/buffer", "utils/unitConversion"], function (require, exports, buffer_1, unitConversion_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createTextBuffer = void 0;
    var defaultCommonStyles = {
        position: { x: "0px", y: "0px" },
        underline: false,
        bold: false,
        italic: false,
        color: "#f00",
        font: "Arial",
        fontSize: "30px",
    };
    var getPositions = function (styles, fontSize) {
        var position = styles.position;
        return [position.x, position.y].map(function (pos) { return (0, unitConversion_1.convertUnitInPx)(pos) + fontSize; });
    };
    var renderUnderline = function (ctx, value, _a, fontSizeInPx) {
        var x = _a.x, y = _a.y;
        var width = ctx.measureText(value).width;
        ctx.fillRect(x, y + 3, width, fontSizeInPx / 15);
    };
    var renderTextNode = function (ctx, textNode, defaultStyles) {
        var value = textNode.value, nodeStyles = textNode.styles;
        var styles = __assign(__assign({}, defaultStyles), nodeStyles);
        var color = styles.color, font = styles.font, fontSize = styles.fontSize, bold = styles.bold, italic = styles.italic, underline = styles.underline;
        var fontSizeInPx = (0, unitConversion_1.convertUnitInPx)(fontSize);
        var _a = getPositions(styles, fontSizeInPx), x = _a[0], y = _a[1];
        ctx.font = "" + (bold ? 'bold ' : '') + (italic ? 'italic ' : '') + fontSizeInPx + "px " + font;
        ctx.fillStyle = color;
        ctx.fillText(value, x, y);
        if (underline) {
            renderUnderline(ctx, value, { x: x, y: y }, fontSizeInPx);
        }
    };
    var createTextBuffer = function (width, height, options) {
        var _a = (0, buffer_1.createBuffer)(width, height), canvas = _a.canvas, ctx = _a.ctx;
        var textNodes = options.textNodes, commonStyles = options.commonStyles;
        var defaultStyles = __assign(__assign({}, defaultCommonStyles), commonStyles);
        textNodes.forEach(function (textNode) {
            renderTextNode(ctx, textNode, defaultStyles);
        });
        return canvas;
    };
    exports.createTextBuffer = createTextBuffer;
});
//# sourceMappingURL=main.js.map