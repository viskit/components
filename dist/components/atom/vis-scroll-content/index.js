var _ScrollContent_scrollHandler, _ScrollContent_loopScrolling, _ScrollContent_scrollingCt;
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from "tslib";
import { query, customElement, property } from "lit/decorators.js";
import { css, html, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { ScrollEventHandler } from "./ScrollEventHandler";
import animejs from "animejs";
let ScrollContent = class ScrollContent extends LitElement {
    constructor() {
        super(...arguments);
        _ScrollContent_scrollHandler.set(this, new ScrollEventHandler(this));
        this.scrollEvents = true;
        this.disable = false;
        _ScrollContent_loopScrolling.set(this, true);
        _ScrollContent_scrollingCt.set(this, void 0);
        this.stopScrolling = () => {
            __classPrivateFieldSet(this, _ScrollContent_loopScrolling, false, "f");
            window.cancelAnimationFrame(__classPrivateFieldGet(this, _ScrollContent_scrollingCt, "f"));
            this.content.style.pointerEvents = "unset";
        };
    }
    static get styles() {
        return css `
      *::-webkit-scrollbar {
        display: none;
      }
      :host {
        contain: content;
      }
      .content {
        overflow-x: hidden;
        width: 100%;
        height: 100%;
      }
      .content.disable {
        overflow: hidden;
      }
      .wrap {
        min-height: 120%;
      }
    `;
    }
    async scrollToElement(el, duration = 0) {
        if (typeof el === "string") {
            el = this.querySelector(el);
        }
        if (el) {
            const scRect = this.wrap.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();
            const scrollTop = elRect.top - scRect.top;
            await this.scrollToPoint(scrollTop, duration);
        }
    }
    async scrollToPoint(scrollTop, duration = 0) {
        this.content.style.pointerEvents = "none";
        this.stopScrolling();
        if (duration > 0) {
            await animejs({
                targets: this.content,
                scrollTop,
                easing: "linear",
                duration,
            }).finished;
        }
        else {
            this.content.scrollTop = scrollTop;
        }
        this.content.style.pointerEvents = "unset";
    }
    async scrollToTop(duration = 0) {
        await this.scrollToPoint(0, duration);
    }
    async scrollToBottom(duration = 0) {
        const { clientHeight, scrollHeight } = this.content;
        await this.scrollToPoint(scrollHeight - clientHeight, duration);
    }
    scrolling(speed = 2) {
        this.content.style.pointerEvents = "none";
        window.cancelAnimationFrame(__classPrivateFieldGet(this, _ScrollContent_scrollingCt, "f"));
        const step = () => {
            this.content.scrollTop += speed;
            if (__classPrivateFieldGet(this, _ScrollContent_loopScrolling, "f")) {
                __classPrivateFieldSet(this, _ScrollContent_scrollingCt, requestAnimationFrame(step), "f");
            }
        };
        __classPrivateFieldSet(this, _ScrollContent_loopScrolling, true, "f");
        step();
        return this.stopScrolling;
    }
    get scrollTop() {
        return this.content.scrollTop;
    }
    get scrollBottom() {
        return (this.content.scrollHeight -
            (this.content.scrollTop + this.content.clientHeight));
    }
    render() {
        return html `
      <div
        class=${classMap({
            content: true,
            disable: this.disable,
        })}
      >
        <div class="wrap">
          <slot></slot>
        </div>
      </div>
    `;
    }
};
_ScrollContent_scrollHandler = new WeakMap(), _ScrollContent_loopScrolling = new WeakMap(), _ScrollContent_scrollingCt = new WeakMap();
ScrollContent.shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
};
__decorate([
    query(".content")
], ScrollContent.prototype, "content", void 0);
__decorate([
    query(".wrap")
], ScrollContent.prototype, "wrap", void 0);
__decorate([
    property({ type: Boolean })
], ScrollContent.prototype, "disable", void 0);
ScrollContent = __decorate([
    customElement("vis-scroll-content")
], ScrollContent);
export { ScrollContent };
