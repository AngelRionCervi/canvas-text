export type Unit = "px" | "rem";

export type ValueAndUnit = string | number;

export type Position = { x: ValueAndUnit; y: ValueAndUnit };

export type PositionInPx = { x: number; y: number };

export type Styles = {
  position: Position;
  underline: boolean;
  bold: boolean;
  italic: boolean;
  color: string;
  font: string;
  fontSize: ValueAndUnit;
};

export interface TextNode {
  value: string;
  styles: Partial<Styles>;
}

export interface TextModel {
  textNodes: TextNode[];
  commonStyles?: Partial<Styles>;
}
