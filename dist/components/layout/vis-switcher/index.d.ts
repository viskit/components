import { LitElement } from "lit";
export declare class Switcher extends LitElement {
    #private;
    static styles: import("lit").CSSResult[];
    wrap: HTMLElement;
    switch(index: Element | number): void;
    get switchedEl(): HTMLElement;
    get switchedIndex(): number;
    disSwitch(): void;
    render(): import("lit-html").TemplateResult<1>;
}
