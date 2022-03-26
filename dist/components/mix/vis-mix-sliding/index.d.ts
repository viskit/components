import { LitElement } from "lit";
import "../../atom/vis-atom-accordion";
import "../../atom/vis-atom-switcher";
import { Accordion } from "../../atom/vis-atom-accordion";
import { Switcher } from "../../atom/vis-atom-switcher";
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
