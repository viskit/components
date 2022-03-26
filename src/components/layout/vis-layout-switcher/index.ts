import { html, css, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";
import renderSwitcher, {
  onlyStyle,
  fillStyle,
} from "../../../templates/vis-switcher";

@customElement("vis-layout-switcher")
export class Switcher extends LitElement {
  static styles = [
    fillStyle,
    onlyStyle,
    css`
      .wrap {
        height: 100%;
      }

      ::slotted(*) {
        transition: width 0.2s linear;
      }
    `,
  ];

  @query(".wrap")
  wrap: HTMLElement;

  #switchedEl: HTMLElement;
  #switchedIndex: number;

  switch(index: Element | number) {
    this.disSwitch();
    let el: HTMLElement;
    if (typeof index === "number") {
      el = this.children.item(index) as HTMLElement;
      this.#switchedIndex = index;
    } else {
      el = index as HTMLElement;
    }
    if (el) {
      el.dataset.visOnly = "on";
      this.#switchedIndex = Array.from(this.children).indexOf(el);
      this.#switchedEl = el;
    }
  }

  get switchedEl() {
    return this.#switchedEl;
  }

  get switchedIndex() {
    return this.#switchedIndex;
  }

  disSwitch() {
    const els = Array.from(this.children);
    els.forEach((el_, i) => {
      const el = el_ as HTMLElement;
      delete el.dataset.visOnly;
    });
    this.#switchedEl = null;
    this.#switchedIndex = -1;
  }

  render() {
    return html` ${renderSwitcher(html`<slot></slot>`, ["wrap"])} `;
  }
}
