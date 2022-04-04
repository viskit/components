import { LitElement, html, css, CSSResultGroup, PropertyValueMap } from "lit";
import { customElement, query, state, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";

@customElement("vis-accordion")
export class Accordion extends LitElement {
  static styles = css`
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

  @query(".content")
  content: HTMLDivElement;

  #duration: number;

  #offset: number = 0;

  get offset() {
    return this.#offset;
  }

  async slide(offset: number, duration?: number) {
    this.#duration = duration;
    this.requestUpdate();
    await this.updateComplete;
    this.#offset = offset;
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
    return html`
      <div class="wrap">
        <div
          class=${classMap({
            content: true,
            transition: !!this.#duration,
          })}
          style=${styleMap({
            transform: `translateX(${this.#offset}px)`,
            "--duration": this.#duration / 1000 + "s",
          })}
        >
          <slot></slot>
        </div>
        <div class="sidebar start">
          <div
            class=${classMap({
              transition: !!this.#duration,
            })}
            style=${styleMap({
              "--duration": this.#duration / 1000 + "s",
              width: `${this.#offset < 0 ? 0 : this.#offset}px`,
            })}
          >
            <slot name="start"></slot>
          </div>
        </div>
        <div class="sidebar">
          <div
            class=${classMap({
              transition: !!this.#duration,
            })}
            style=${styleMap({
              "--duration": this.#duration / 1000 + "s",
              width: `${-this.#offset < 0 ? 0 : -this.#offset}px`,
            })}
          >
            <slot name="end"></slot>
          </div>
        </div>
      </div>
    `;
  }
}
