declare module "types" {
    export type Unit = "px" | "rem";
    export type ValueAndUnit = string | number;
    export type Position = {
        x: ValueAndUnit;
        y: ValueAndUnit;
    };
    export type PositionInPx = {
        x: number;
        y: number;
    };
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
}
declare module "utils/buffer" {
    export const createBuffer: (width: number, height: number) => {
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
    };
}
declare module "utils/unitConversion" {
    import { ValueAndUnit } from "types";
    export const convertUnitInPx: (valueAndUnit: ValueAndUnit) => number;
}
declare module "main" {
    import { TextModel } from "types";
    export const createTextBuffer: (width: number, height: number, options: TextModel) => HTMLCanvasElement;
}
//# sourceMappingURL=main.d.ts.map