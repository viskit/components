var _Sliding_startSwitcherWidth, _Sliding_endSwitcherWidth;
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import "../../layout/vis-accordion";
import "../../layout/vis-switcher";
import { customElement, query } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import fillStyle from "../../../css/fill";
import { SlideEventDispatcher, } from "../../../lib/SlideEventDispatcher";
let Sliding = class Sliding extends LitElement {
    constructor() {
        super(...arguments);
        this.slideEventDispatcher = new SlideEventDispatcher(this);
        _Sliding_startSwitcherWidth.set(this, 0);
        _Sliding_endSwitcherWidth.set(this, 0);
    }
    renderSlotWraps(start = true) {
        const els = Array.from(this.querySelectorAll(`[slot^=${start ? "start" : "end"}]`));
        return repeat(els, (el, i) => el.getAttribute("slot"), (el, i) => html `
        <div class="vis-fill-container slot-wrap">
          <slot name=${el.getAttribute("slot")}></slot>
        </div>
      `);
    }
    get startSwitcherWidth() {
        return __classPrivateFieldGet(this, _Sliding_startSwitcherWidth, "f");
    }
    get endSwitcherWidth() {
        return __classPrivateFieldGet(this, _Sliding_endSwitcherWidth, "f");
    }
    async updated() {
        await this.updateComplete;
        this.calcEndSwitcherWidth();
        this.calcStartSwitcherWidth();
    }
    calcStartSwitcherWidth() {
        const els = Array.from(this.querySelectorAll(`[slot^=start]`));
        __classPrivateFieldSet(this, _Sliding_startSwitcherWidth, 0, "f");
        els.forEach((el) => (__classPrivateFieldSet(this, _Sliding_startSwitcherWidth, __classPrivateFieldGet(this, _Sliding_startSwitcherWidth, "f") + parseInt(window.getComputedStyle(els[0]).width), "f")));
    }
    calcEndSwitcherWidth() {
        const els = Array.from(this.querySelectorAll(`[slot^=end]`));
        __classPrivateFieldSet(this, _Sliding_endSwitcherWidth, 0, "f");
        els.forEach((el) => (__classPrivateFieldSet(this, _Sliding_endSwitcherWidth, __classPrivateFieldGet(this, _Sliding_endSwitcherWidth, "f") + parseInt(window.getComputedStyle(els[0]).width), "f")));
    }
    render() {
        return html `
      <vis-accordion>
        <vis-switcher slot="start"> ${this.renderSlotWraps()} </vis-switcher>
        <slot></slot>
        <vis-switcher slot="end">${this.renderSlotWraps(false)}</vis-switcher>
      </vis-accordion>
    `;
    }
};
_Sliding_startSwitcherWidth = new WeakMap(), _Sliding_endSwitcherWidth = new WeakMap();
Sliding.styles = [
    fillStyle,
    css `
      .slot-wrap {
        height: 100%;
      }
    `,
];
__decorate([
    query("vis-accordion")
], Sliding.prototype, "accordion", void 0);
__decorate([
    query("vis-switcher:nth-of-type(1)")
], Sliding.prototype, "startSwitcher", void 0);
__decorate([
    query("vis-switcher:nth-of-type(2)")
], Sliding.prototype, "endSwitcher", void 0);
Sliding = __decorate([
    customElement("vis-sliding")
], Sliding);
export { Sliding };
