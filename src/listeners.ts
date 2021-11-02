import { UNDERLINE_DISTANCE_FROM_BOTTOM, UNDERLINE_HEIGHT } from "./constants";
import { Listeners, PositionInPx } from "./types";

export const handleListeners = (
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
    return (
      clientX >= docPos.x &&
      clientY >= docPos.y &&
      clientX <= docPos.x + textWidth &&
      clientY <= docPos.y + fontSizeInPx + UNDERLINE_HEIGHT(fontSizeInPx) + UNDERLINE_DISTANCE_FROM_BOTTOM
    );
  };

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
