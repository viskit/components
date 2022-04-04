import { LitElement } from "lit";
import "../../layout/vis-accordion";
import "../../layout/vis-switcher";
import { Accordion } from "../../layout/vis-accordion";
import { Switcher } from "../../layout/vis-switcher";
import { SlideEventDispatcher } from "../../../lib/SlideEventDispatcher";
export declare class Sliding extends LitElement {
    #private;
    static styles: import("lit").CSSResult[];
    slideEventDispatcher: SlideEventDispatcher;
    accordion: Accordion;
    startSwitcher: Switcher;
    endSwitcher: Switcher;
    renderSlotWraps(start?: boolean): unknown;
    get startSwitcherWidth(): number;
    get endSwitcherWidth(): number;
    updated(): Promise<void>;
    calcStartSwitcherWidth(): void;
    calcEndSwitcherWidth(): void;
    render(): import("lit-html").TemplateResult<1>;
}
