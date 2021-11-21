export declare type Unit = "px" | "rem";
export declare type ValueAndUnit = string | number;
export declare type Position = {
    x: ValueAndUnit;
    y: ValueAndUnit;
};
export declare type PositionInPx = {
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
//# sourceMappingURL=types.d.ts.map