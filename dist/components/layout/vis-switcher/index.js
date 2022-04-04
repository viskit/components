var _Switcher_switchedEl, _Switcher_switchedIndex;
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from "tslib";
import { html, css, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";
import renderSwitcher, { onlyStyle, fillStyle, } from "../../../templates/switcher";
let Switcher = class Switcher extends LitElement {
    constructor() {
        super(...arguments);
        _Switcher_switchedEl.set(this, void 0);
        _Switcher_switchedIndex.set(this, void 0);
    }
    switch(index) {
        this.disSwitch();
        let el;
        if (typeof index === "number") {
            el = this.children.item(index);
            __classPrivateFieldSet(this, _Switcher_switchedIndex, index, "f");
        }
        else {
            el = index;
        }
        if (el) {
            el.dataset.visOnly = "on";
            __classPrivateFieldSet(this, _Switcher_switchedIndex, Array.from(this.children).indexOf(el), "f");
            __classPrivateFieldSet(this, _Switcher_switchedEl, el, "f");
        }
    }
    get switchedEl() {
        return __classPrivateFieldGet(this, _Switcher_switchedEl, "f");
    }
    get switchedIndex() {
        return __classPrivateFieldGet(this, _Switcher_switchedIndex, "f");
    }
    disSwitch() {
        const els = Array.from(this.children);
        els.forEach((el_, i) => {
            const el = el_;
            delete el.dataset.visOnly;
        });
        __classPrivateFieldSet(this, _Switcher_switchedEl, null, "f");
        __classPrivateFieldSet(this, _Switcher_switchedIndex, -1, "f");
    }
    render() {
        return html ` ${renderSwitcher(html `<slot></slot>`, ["wrap"])} `;
    }
};
_Switcher_switchedEl = new WeakMap(), _Switcher_switchedIndex = new WeakMap();
Switcher.styles = [
    fillStyle,
    onlyStyle,
    css `
      .wrap {
        height: 100%;
      }

      ::slotted(*) {
        transition: width 0.2s linear;
      }
    `,
];
__decorate([
    query(".wrap")
], Switcher.prototype, "wrap", void 0);
Switcher = __decorate([
    customElement("vis-switcher")
], Switcher);
export { Switcher };
