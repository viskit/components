import { LitElement } from "lit";
export declare class Artboard extends LitElement {
    static styles: import("lit").CSSResult[];
    started: boolean;
    paths: number[][][];
    paths2: number[][];
    paths3: number[][];
    pointermove: any;
    pointerdown(e: PointerEvent): void;
    pointerend(e: PointerEvent): void;
    render(): import("lit-html").TemplateResult<1>;
}
