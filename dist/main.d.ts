declare module "constants" {
    export const UNDERLINE_DISTANCE_FROM_BOTTOM = 3;
    export const BOLD_UNDERLINE_DIVIDER = 13;
    export const REGULAR_UNDERLINE_DIVIDER = 15;
}
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
    export interface Listeners {
        onClick?: (evt: Event) => void;
        onMouseEnter?: (evt: Event) => void;
        onMouseLeave?: (evt: Event) => void;
    }
    export interface Styles {
        position: Position;
        underline: boolean;
        bold: boolean;
        italic: boolean;
        color: string;
        font: string;
        fontSize: ValueAndUnit;
    }
    export interface TextNode {
        value: string;
        styles: Partial<Styles>;
        onClick?: () => void;
        onMouseEnter?: () => void;
        onMouseLeave?: () => void;
    }
    export interface TextModel {
        textNodes: TextNode[];
        commonStyles?: Partial<Styles>;
    }
}
declare module "utils/units" {
    import { Position, ValueAndUnit } from "types";
    export const convertUnitInPx: (valueAndUnit: ValueAndUnit) => number;
    export const getPositionInPx: (position: Position, fontSize: number) => number[];
    export const getUnderlineHeight: (fontSizeInPx: number, bold: boolean) => number;
    export const getFullTextHeight: (fontSizeInPx: number, underline: boolean, bold: boolean) => number;
}
declare module "listeners" {
    import { Listeners, PositionInPx } from "types";
    export const handleListeners: (listeners: Listeners, textRelativePos: PositionInPx, renderer: HTMLCanvasElement, textWidth: number, fontSizeInPx: number, underline: boolean, bold: boolean) => void;
}
declare module "utils/buffer" {
    export const createBuffer: (width: number, height: number) => {
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
    };
}
declare module "rendering" {
    import { TextModel } from "types";
    export const createTextBuffer: (width: number, height: number, options: TextModel, renderer?: HTMLCanvasElement | undefined) => HTMLCanvasElement;
}
declare module "main" {
    import { createTextBuffer } from "rendering";
    export { createBuffer } from "utils/buffer";
    export { getFullTextHeight } from "utils/units";
    export default createTextBuffer;
}
//# sourceMappingURL=main.d.ts.map