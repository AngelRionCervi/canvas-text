import { Unit, ValueAndUnit } from "../types";

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
  if (typeof valueAndUnit === 'number') return valueAndUnit;

  const [value, unit] = getValueAndUnit(valueAndUnit);
  const unitMap = {
    rem: convertRemToPixels,
    px: (val: number) => val,
  };

  return unitMap[unit](value);
};
