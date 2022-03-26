import { css, LitElement, html, CSSResultGroup } from "lit";
import fillStyle from "../src/css/fill";
import onlyStyle from "../src/css/only";
import { customElement, query } from "lit/decorators.js";

export class FillOnly extends LitElement {
  static styles = [
    fillStyle,
    onlyStyle,
    css`
      .box {
        height: 30px;
      }
      .item {
        transition: width 0.5s linear;
        border: 1px solid blue;
      }
    `,
  ];

  render() {
    return html`
      <h3>vis-fill-container vis-only-container</h3>
      <div class="box vis-fill-container vis-only-container">
        <div
          @click=${(e) => {
            if (e.target.classList.contains("only")) {
              e.target.classList.remove("only");
            } else {
              e.target.classList.add("only");
            }
          }}
          class="item"
        >
          11111
        </div>
        <div class="item">22222</div>
      </div>
    `;
  }
}
window.customElements.define("demo-fill-only",FillOnly);
