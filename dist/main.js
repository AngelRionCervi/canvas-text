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
define("constants", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.REGULAR_UNDERLINE_DIVIDER = exports.BOLD_UNDERLINE_DIVIDER = exports.UNDERLINE_DISTANCE_FROM_BOTTOM = void 0;
    exports.UNDERLINE_DISTANCE_FROM_BOTTOM = 3;
    exports.BOLD_UNDERLINE_DIVIDER = 13;
    exports.REGULAR_UNDERLINE_DIVIDER = 15;
});
define("types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
});
define("utils/units", ["require", "exports", "constants"], function (require, exports, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getFullTextHeight = exports.getUnderlineHeight = exports.getPositionInPx = exports.convertUnitInPx = void 0;
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
});
define("listeners", ["require", "exports", "utils/units"], function (require, exports, units_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.handleListeners = void 0;
    var handleListeners = function (listeners, textRelativePos, renderer, textWidth, fontSizeInPx, underline, bold) {
        var onClick = listeners.onClick, onMouseEnter = listeners.onMouseEnter, onMouseLeave = listeners.onMouseLeave;
        var rendererRect = renderer.getBoundingClientRect();
        var docPos = {
            x: textRelativePos.x + rendererRect.x + window.scrollX,
            y: textRelativePos.y + rendererRect.y + window.scrollY - fontSizeInPx,
        };
        var checkInBound = function (clientX, clientY) {
            return (clientX >= docPos.x &&
                clientY >= docPos.y &&
                clientX <= docPos.x + textWidth &&
                clientY <= docPos.y + (0, units_1.getFullTextHeight)(fontSizeInPx, underline, bold));
        };
        if (onClick) {
            document.body.addEventListener("click", function (evt) {
                if (checkInBound(evt.clientX, evt.clientY)) {
                    onClick(evt);
                }
            });
        }
        var alreadyInBound = false;
        if (onMouseEnter || onMouseLeave) {
            document.body.addEventListener("mousemove", function (evt) {
                var isInBound = checkInBound(evt.clientX, evt.clientY);
                if (isInBound && !alreadyInBound) {
                    onMouseEnter === null || onMouseEnter === void 0 ? void 0 : onMouseEnter(evt);
                    alreadyInBound = true;
                }
                else if (!isInBound && alreadyInBound) {
                    onMouseLeave === null || onMouseLeave === void 0 ? void 0 : onMouseLeave(evt);
                    alreadyInBound = false;
                }
            });
        }
    };
    exports.handleListeners = handleListeners;
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
define("rendering", ["require", "exports", "constants", "listeners", "utils/buffer", "utils/units"], function (require, exports, constants_2, listeners_1, buffer_1, units_2) {
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
    var renderUnderline = function (ctx, _a, textWidth, fontSizeInPx, bold) {
        var x = _a.x, y = _a.y;
        ctx.fillRect(x, y + constants_2.UNDERLINE_DISTANCE_FROM_BOTTOM, textWidth, (0, units_2.getUnderlineHeight)(fontSizeInPx, bold));
    };
    var renderTextNode = function (ctx, textNode, defaultStyles, renderer) {
        var value = textNode.value, nodeStyles = textNode.styles, listeners = __rest(textNode, ["value", "styles"]);
        var styles = __assign(__assign({}, defaultStyles), nodeStyles);
        var position = styles.position, color = styles.color, font = styles.font, fontSize = styles.fontSize, bold = styles.bold, italic = styles.italic, underline = styles.underline;
        var fontSizeInPx = (0, units_2.convertUnitInPx)(fontSize);
        var _a = (0, units_2.getPositionInPx)(position, fontSizeInPx), x = _a[0], y = _a[1];
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
});
define("main", ["require", "exports", "rendering", "utils/buffer", "utils/units"], function (require, exports, rendering_1, buffer_2, units_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getFullTextHeight = exports.createBuffer = void 0;
    Object.defineProperty(exports, "createBuffer", { enumerable: true, get: function () { return buffer_2.createBuffer; } });
    Object.defineProperty(exports, "getFullTextHeight", { enumerable: true, get: function () { return units_3.getFullTextHeight; } });
    exports.default = rendering_1.createTextBuffer;
});
//# sourceMappingURL=main.js.map