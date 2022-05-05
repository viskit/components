import { LitElement } from "lit";
export declare class Accordion extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    content: HTMLDivElement;
    test: any;
    get offset(): number;
    slide(offset: number, duration?: number): Promise<unknown>;
    render(): import("lit-html").TemplateResult<1>;
}
