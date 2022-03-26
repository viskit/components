import { LitElement, html, css, CSSResultGroup, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

@customElement("vis-textarea")
export class Textarea extends LitElement {
  static styles = css`
    .container {
      outline: none;
    }
    .container div {
      font-size: var(--vis-font-size, 1rem);
      min-height: var(--vis-font-size, 1rem);
    }
  `;

  @query(".container")
  container: HTMLDivElement;

  @property({ type: String })
  value = "";

  text2template(text: string) {
    return text
      .split("\n")
      .map(
        (tr) => html`
          <div>${tr.split(" ").map((v) => (v ? v : html`&nbsp;`))}</div>
        `
      );
  }

  render() {
    return html`
      <div
        class="container"
        @focus=${() => console.log("focus")}
        spellcheck="false"
        contenteditable="true"
      >
        ${this.text2template(this.value)}
      </div>
    `;
  }
}
