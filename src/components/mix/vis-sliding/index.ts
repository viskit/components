import { LitElement, html, css, CSSResultGroup, PropertyValueMap } from "lit";
import "../../layout/vis-accordion";
import "../../layout/vis-switcher";
import { customElement, query } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { Accordion } from "../../layout/vis-accordion";
import { Switcher } from "../../layout/vis-switcher";
import fillStyle from "../../../css/fill";
import {
  SlideEventDispatcher,
  SlideEventInit,
} from "../../../lib/SlideEventDispatcher";

@customElement("vis-sliding")
export class Sliding extends LitElement {
  static styles = [
    fillStyle,
    css`
      .slot-wrap {
        height: 100%;
      }
    `,
  ];
  slideEventDispatcher = new SlideEventDispatcher(this);

  @query("vis-accordion")
  accordion: Accordion;

  @query("vis-switcher:nth-of-type(1)")
  startSwitcher: Switcher;

  @query("vis-switcher:nth-of-type(2)")
  endSwitcher: Switcher;

  renderSlotWraps(start = true) {
    const els = Array.from(
      this.querySelectorAll(`[slot^=${start ? "start" : "end"}]`)
    );
    return repeat(
      els,
      (el, i) => el.getAttribute("slot"),
      (el, i) => html`
        <div class="vis-fill-container slot-wrap">
          <slot name=${el.getAttribute("slot")}></slot>
        </div>
      `
    );
  }

  #startSwitcherWidth = 0;
  #endSwitcherWidth = 0;

  get startSwitcherWidth() {
    return this.#startSwitcherWidth;
  }

  get endSwitcherWidth() {
    return this.#endSwitcherWidth;
  }

  async updated() {
    await this.updateComplete;
    this.calcEndSwitcherWidth();
    this.calcStartSwitcherWidth();
  }

  calcStartSwitcherWidth() {
    const els = Array.from(this.querySelectorAll(`[slot^=start]`));
    this.#startSwitcherWidth = 0;
    els.forEach(
      (el) =>
        (this.#startSwitcherWidth += parseInt(
          window.getComputedStyle(els[0]).width
        ))
    );
  }

  calcEndSwitcherWidth() {
    const els = Array.from(this.querySelectorAll(`[slot^=end]`));
    this.#endSwitcherWidth = 0;
    els.forEach(
      (el) =>
        (this.#endSwitcherWidth += parseInt(
          window.getComputedStyle(els[0]).width
        ))
    );
  }

  render() {
    return html`
      <vis-accordion>
        <vis-switcher slot="start"> ${this.renderSlotWraps()} </vis-switcher>
        <slot></slot>
        <vis-switcher slot="end">${this.renderSlotWraps(false)}</vis-switcher>
      </vis-accordion>
    `;
  }
}
