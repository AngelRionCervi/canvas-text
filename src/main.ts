import { UNDERLINE_DISTANCE_FROM_BOTTOM, UNDERLINE_HEIGHT } from "./constants";
import { Listeners, PositionInPx, Styles, TextModel, TextNode } from "./types";
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

const renderUnderline = (
  ctx: CanvasRenderingContext2D,
  { x, y }: PositionInPx,
  textWidth: number,
  fontSizeInPx: number
) => {
  ctx.fillRect(x, y + UNDERLINE_DISTANCE_FROM_BOTTOM, textWidth, UNDERLINE_HEIGHT(fontSizeInPx));
};

const handleListeners = (
  listeners: Listeners,
  textRelativePos: PositionInPx,
  renderer: HTMLCanvasElement,
  textWidth: number,
  fontSizeInPx: number
) => {
  const { onClick, onMouseEnter, onMouseLeave } = listeners;
  const rendererRect = renderer.getBoundingClientRect();
  const docPos = {
    x: textRelativePos.x + rendererRect.x + window.scrollX,
    y: textRelativePos.y + rendererRect.y + window.scrollY - fontSizeInPx,
  };

  const checkInBound = (clientX: number, clientY: number) => {
    return clientX >= docPos.x && clientY >= docPos.y && clientX <= docPos.x + textWidth && clientY <= docPos.y + fontSizeInPx + 10;
  }
    
  if (onClick) {
    document.body.addEventListener("click", (evt) => {
      if (checkInBound(evt.clientX, evt.clientY)) {
        onClick(evt);
      }
    });
  }

  let alreadyInBound = false;

  if (onMouseEnter || onMouseLeave) {
    document.body.addEventListener("mousemove", (evt) => {
      const isInBound = checkInBound(evt.clientX, evt.clientY);
      if (isInBound && !alreadyInBound) {
        onMouseEnter?.(evt);
        alreadyInBound = true;
      } else if (!isInBound && alreadyInBound) {
        onMouseLeave?.(evt);
        alreadyInBound = false;
      }
    });
  }
};

const renderTextNode = (
  ctx: CanvasRenderingContext2D,
  textNode: TextNode,
  defaultStyles: Styles,
  renderer?: HTMLCanvasElement
) => {
  const { value, styles: nodeStyles, ...listeners } = textNode;
  const styles = { ...defaultStyles, ...nodeStyles };
  const { color, font, fontSize, bold, italic, underline } = styles;
  const fontSizeInPx = convertUnitInPx(fontSize);
  const [x, y] = getPositions(styles, fontSizeInPx);

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
