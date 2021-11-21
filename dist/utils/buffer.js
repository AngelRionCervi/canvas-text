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
//# sourceMappingURL=buffer.js.map