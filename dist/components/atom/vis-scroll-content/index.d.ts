import { LitElement } from "lit";
export declare class ScrollContent extends LitElement {
    #private;
    static shadowRootOptions: {
        delegatesFocus: boolean;
        mode: ShadowRootMode;
        slotAssignment?: SlotAssignmentMode;
    };
    content: HTMLElement;
    wrap: HTMLElement;
    static get styles(): import("lit").CSSResult;
    scrollEvents: boolean;
    disable: boolean;
    scrollToElement(el: HTMLElement | string, duration?: number): Promise<void>;
    scrollToPoint(scrollTop: number, duration?: number): Promise<void>;
    scrollToTop(duration?: number): Promise<void>;
    scrollToBottom(duration?: number): Promise<void>;
    stopScrolling: () => void;
    scrolling(speed?: number): () => void;
    get scrollTop(): number;
    get scrollBottom(): number;
    render(): import("lit-html").TemplateResult<1>;
}
