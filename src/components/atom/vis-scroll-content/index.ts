import { query, customElement, property } from "lit/decorators.js";
import { css, html, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { ScrollEventHandler } from "./ScrollEventHandler";
import animejs from "animejs";

@customElement("vis-scroll-content")
export class ScrollContent extends LitElement {
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @query(".content")
  content: HTMLElement;

  @query(".wrap")
  wrap: HTMLElement;

  static get styles() {
    return css`
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

  #scrollHandler = new ScrollEventHandler(this);

  scrollEvents = true;

  @property({ type: Boolean })
  disable = false;

  async scrollToElement(el: HTMLElement | string, duration = 0) {
    if (typeof el === "string") {
      el = this.querySelector(el) as HTMLElement;
    }

    if (el) {
      const scRect = this.wrap.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const scrollTop = elRect.top - scRect.top;
      await this.scrollToPoint(scrollTop, duration);
    }
  }

  async scrollToPoint(scrollTop: number, duration = 0) {
    this.content.style.pointerEvents = "none";
    this.stopScrolling();
    if (duration > 0) {
      await animejs({
        targets: this.content,
        scrollTop,
        easing: "linear",
        duration,
      }).finished;
    } else {
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

  #loopScrolling = true;
  #scrollingCt: any;

  stopScrolling = () => {
    this.#loopScrolling = false;
    window.cancelAnimationFrame(this.#scrollingCt);
    this.content.style.pointerEvents = "unset";
  };
  scrolling(speed = 2) {
    this.content.style.pointerEvents = "none";
    window.cancelAnimationFrame(this.#scrollingCt);
    const step = () => {
      this.content.scrollTop += speed;
      if (this.#loopScrolling) {
        this.#scrollingCt = requestAnimationFrame(step);
      }
    };
    this.#loopScrolling = true;
    step();
    return this.stopScrolling;
  }

  get scrollTop() {
    return this.content.scrollTop;
  }

  get scrollBottom() {
    return (
      this.content.scrollHeight -
      (this.content.scrollTop + this.content.clientHeight)
    );
  }

  render() {
    return html`
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
}
