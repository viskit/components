import { LitElement, PropertyValueMap } from "lit";
export declare class Demo extends LitElement {
    source: string;
    codeEl: HTMLElement;
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): import("lit-html").TemplateResult<2 | 1>;
}
