import { LitElement, css, PropertyValueMap } from "lit";
import { html } from "lit/static-html";
import { state, property, customElement, query } from "lit/decorators.js";
import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { html as htmlLang } from "@codemirror/lang-html";

@customElement("vis-demo")
export class Demo extends LitElement {
  @state()
  source: string;

  @query(".code")
  codeEl: HTMLElement;

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    let view = new EditorView({
      state: EditorState.create({
        extensions: [basicSetup, htmlLang()],
      }),
      parent: this.codeEl,
    });
    const scriptTag = this.querySelector("script");
    if (scriptTag) {
      const script = document.createElement("script");
      script.text = scriptTag.innerText;
      this.appendChild(script);
      scriptTag.remove();
    }
    this.shadowRoot.querySelector("slot").addEventListener("slotchange", () => {
      view.setState(
        EditorState.create({
          doc: this.innerHTML,
          extensions: [basicSetup, htmlLang()],
        })
      );
    });
  }

  render() {
    return html`<div class="wrap">
      <div class="demo"><slot></slot></div>
      <div class="code"></div>
    </div>`;
  }
}
