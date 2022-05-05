var _Accordion_duration, _Accordion_offset;
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, query, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";
let Accordion = class Accordion extends LitElement {
    constructor() {
        super(...arguments);
        _Accordion_duration.set(this, void 0);
        _Accordion_offset.set(this, 0);
    }
    get offset() {
        return __classPrivateFieldGet(this, _Accordion_offset, "f");
    }
    async slide(offset, duration) {
        __classPrivateFieldSet(this, _Accordion_duration, duration, "f");
        this.requestUpdate();
        await this.updateComplete;
        __classPrivateFieldSet(this, _Accordion_offset, offset, "f");
        setTimeout(() => {
            this.requestUpdate();
        });
        let resolve;
        const promise = new Promise((r) => (resolve = r));
        this.content.addEventListener("transitionend", () => resolve(), {
            once: true,
        });
        return promise;
    }
    render() {
        return html `
      <div class="wrap">
        <div
          class=${classMap({
            content: true,
            transition: !!__classPrivateFieldGet(this, _Accordion_duration, "f"),
        })}
          style=${styleMap({
            transform: `translateX(${__classPrivateFieldGet(this, _Accordion_offset, "f")}px)`,
            "--duration": __classPrivateFieldGet(this, _Accordion_duration, "f") / 1000 + "s",
        })}
        >
          <slot></slot>
        </div>
        <div class="sidebar start">
          <div
            class=${classMap({
            transition: !!__classPrivateFieldGet(this, _Accordion_duration, "f"),
        })}
            style=${styleMap({
            "--duration": __classPrivateFieldGet(this, _Accordion_duration, "f") / 1000 + "s",
            width: `${__classPrivateFieldGet(this, _Accordion_offset, "f") < 0 ? 0 : __classPrivateFieldGet(this, _Accordion_offset, "f")}px`,
        })}
          >
            <slot name="start"></slot>
          </div>
        </div>
        <div class="sidebar">
          <div
            class=${classMap({
            transition: !!__classPrivateFieldGet(this, _Accordion_duration, "f"),
        })}
            style=${styleMap({
            "--duration": __classPrivateFieldGet(this, _Accordion_duration, "f") / 1000 + "s",
            width: `${-__classPrivateFieldGet(this, _Accordion_offset, "f") < 0 ? 0 : -__classPrivateFieldGet(this, _Accordion_offset, "f")}px`,
        })}
          >
            <slot name="end"></slot>
          </div>
        </div>
      </div>
    `;
    }
};
_Accordion_duration = new WeakMap(), _Accordion_offset = new WeakMap();
Accordion.styles = css `
    :host {
      --duration: 0;
    }
    .wrap {
      overflow: hidden;
      position: relative;
    }

    .content {
      z-index: 1;
      position: relative;
      transform: translateX(0);
    }

    .sidebar {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      color: red;
      z-index: 0;
      display: flex;
      justify-content: flex-end;
      pointer-events: none;
    }

    .sidebar.start {
      justify-content: flex-start;
    }

    .sidebar > div {
      pointer-events: all;
      overflow: hidden;
      width: 0;
    }

    .transition {
      transition: width var(--duration) linear, transform var(--duration) linear;
    }
  `;
__decorate([
    query(".content")
], Accordion.prototype, "content", void 0);
__decorate([
    property()
], Accordion.prototype, "test", void 0);
Accordion = __decorate([
    customElement("vis-accordion")
], Accordion);
export { Accordion };
