import { UNDERLINE_DISTANCE_FROM_BOTTOM, UNDERLINE_HEIGHT } from "./constants";
import { handleListeners } from "./listeners";
import { PositionInPx, Styles, TextModel, TextNode } from "./types";
import { createBuffer } from "./utils/buffer";
import { convertUnitInPx, getPositionInPx } from "./utils/unitConversion";

const defaultCommonStyles = {
  position: { x: "0px", y: "0px" },
  underline: false,
  bold: false,
  italic: false,
  color: "#f00",
  font: "Arial",
  fontSize: "30px",
} as Styles;

const renderUnderline = (
  ctx: CanvasRenderingContext2D,
  { x, y }: PositionInPx,
  textWidth: number,
  fontSizeInPx: number
) => {
  ctx.fillRect(x, y + UNDERLINE_DISTANCE_FROM_BOTTOM, textWidth, UNDERLINE_HEIGHT(fontSizeInPx));
};

const renderTextNode = (
  ctx: CanvasRenderingContext2D,
  textNode: TextNode,
  defaultStyles: Styles,
  renderer?: HTMLCanvasElement
) => {
  const { value, styles: nodeStyles, ...listeners } = textNode;
  const styles = { ...defaultStyles, ...nodeStyles };
  const { position, color, font, fontSize, bold, italic, underline } = styles;
  const fontSizeInPx = convertUnitInPx(fontSize);
  const [x, y] = getPositionInPx(position, fontSizeInPx);

  ctx.font = `${bold ? "bold " : ""}${italic ? "italic " : ""}${fontSizeInPx}px ${font}`;
  ctx.fillStyle = color;
  ctx.fillText(value, x, y);
  const { width: textWidth } = ctx.measureText(value);

  if (underline) {
    renderUnderline(ctx, { x, y }, textWidth, fontSizeInPx);
  }

  if (listeners) {
    if (!renderer) {
      throw new Error(
        "You must provide a renderer argument to createTextBuffer to use listeners (onClick, onMouseEnter, onMouseLeave)"
      );
    }
    handleListeners(listeners, { x, y }, renderer, textWidth, fontSizeInPx);
  }
};

export const createTextBuffer = (width: number, height: number, options: TextModel, renderer?: HTMLCanvasElement) => {
  const { canvas, ctx } = createBuffer(width, height);
  const { textNodes, commonStyles } = options;
  const defaultStyles = { ...defaultCommonStyles, ...commonStyles };

  textNodes.forEach((textNode) => {
    renderTextNode(ctx, textNode, defaultStyles, renderer);
  });

  return canvas;
};
