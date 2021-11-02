import { BOLD_UNDERLINE_DIVIDER, REGULAR_UNDERLINE_DIVIDER, UNDERLINE_DISTANCE_FROM_BOTTOM } from "../constants";
import { Position, Unit, ValueAndUnit } from "../types";

const convertRemToPixels = (rem: number) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

const getValueAndUnit = (str: string): [number, Unit] => {
  const valueRegex = /[+-]?\d+(\.\d+)?/g;
  const unitRegex = /[a-zA-Z]+/g;
  const value = parseFloat(str.match(valueRegex)?.[0] ?? "0");
  const unit = (str.match(unitRegex)?.[0] ?? "px") as Unit;

  return [value, unit];
};

export const convertUnitInPx = (valueAndUnit: ValueAndUnit) => {
  if (typeof valueAndUnit === "number") return valueAndUnit;

  const [value, unit] = getValueAndUnit(valueAndUnit);
  const unitMap = {
    rem: convertRemToPixels,
    px: (val: number) => val,
  };

  return unitMap[unit](value);
};

export const getPositionInPx = (position: Position, fontSize: number) => {
  return [position.x, position.y].map((pos, index) => convertUnitInPx(pos) + (index ? fontSize : 0));
};

export const getUnderlineHeight = (fontSizeInPx: number, bold: boolean) => {
  return fontSizeInPx / (bold ? BOLD_UNDERLINE_DIVIDER : REGULAR_UNDERLINE_DIVIDER);
}
  
export const getFullTextHeight = (fontSizeInPx: number, underline: boolean, bold: boolean) => {
  if (!underline) return fontSizeInPx;
  return fontSizeInPx + UNDERLINE_DISTANCE_FROM_BOTTOM + getUnderlineHeight(fontSizeInPx, bold);
};
