"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleListeners = void 0;
var units_1 = require("./utils/units");
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
//# sourceMappingURL=listeners.js.map