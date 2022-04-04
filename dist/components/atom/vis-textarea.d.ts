import { LitElement } from "lit";
export declare class Textarea extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    get editor(): Promise<unknown>;
    private iframe;
    firstUpdated(): Promise<void>;
    updated(map: Map<string, any>): void;
    value: unknown;
    render(): import("lit-html/directive").DirectiveResult<typeof import("lit-html/directives/guard").GuardDirective>;
}
