import { LitElement } from "lit";
import { GuardDirective } from "lit-html/directives/guard.js";
export declare class Textarea extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    get editor(): HTMLElement;
    private iframe;
    firstUpdated(): Promise<void>;
    disconnectedCallback(): void;
    editorStyle: string;
    insert(node: Node | string): void;
    updated(map: Map<string, any>): void;
    value: unknown;
    render(): import("lit-html/directive").DirectiveResult<typeof GuardDirective>;
}
