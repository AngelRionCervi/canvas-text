
import { PositionInPx, Styles, TextModel, TextNode } from "./types";
import { createBuffer } from "./utils/buffer";
import { convertUnitInPx } from "./utils/unitConversion";

const defaultCommonStyles = {
  position: { x: "0px", y: "0px" },
  underline: false,
  bold: false,
  italic: false,
  color: "#f00",
  font: "Arial",
  fontSize: "30px",
} as Styles;

const getPositions = (styles: Styles, fontSize: number) => {
  const { position } = styles;
  return [position.x, position.y].map((pos) => convertUnitInPx(pos) + fontSize);
};

const renderUnderline = (ctx: CanvasRenderingContext2D, value: string, {x, y}: PositionInPx, fontSizeInPx: number) => {
  const { width } = ctx.measureText(value);
  ctx.fillRect(x, y + 3, width, fontSizeInPx / 15);
};

const renderTextNode = (ctx: CanvasRenderingContext2D, textNode: TextNode, defaultStyles: Styles) => {
  const { value, styles: nodeStyles } = textNode;
  const styles = { ...defaultStyles, ...nodeStyles };
  const { color, font, fontSize, bold, italic, underline } = styles;
  const fontSizeInPx = convertUnitInPx(fontSize);
  const [x, y] = getPositions(styles, fontSizeInPx);

  ctx.font = `${bold ? 'bold ' : ''}${italic ? 'italic ' : ''}${fontSizeInPx}px ${font}`;
  ctx.fillStyle = color;
  ctx.fillText(value, x, y);

  if (underline) {
    renderUnderline(ctx, value, {x, y}, fontSizeInPx);
  }
};

export const createTextBuffer = (width: number, height: number, options: TextModel) => {
  const { canvas, ctx } = createBuffer(width, height);
  const { textNodes, commonStyles } = options;
  const defaultStyles = { ...defaultCommonStyles, ...commonStyles };

  textNodes.forEach((textNode) => {
    renderTextNode(ctx, textNode, defaultStyles);
  });

  return canvas;
};
