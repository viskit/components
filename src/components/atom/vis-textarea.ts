import {
  LitElement,
  html,
  css,
  render,
  PropertyValueMap,
  unsafeCSS,
} from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { guard } from "lit/directives/guard.js";
import { wait } from "../../lib/wait";
import { GuardDirective } from "lit-html/directives/guard.js";

@customElement("vis-textarea")
export class Textarea extends LitElement {
  static styles = css`
    iframe {
      border: none;
      outline: none;
      width: 100%;
      height: 100%;
      display: block;
    }
    :host {
      contain: content;
      display: block;
    }
  `;

  #loaded = false;

  get editor() {
    return this.iframe.contentWindow.document.querySelector(
      "#editor"
    ) as HTMLElement;
  }

  @query("iframe")
  private iframe: HTMLIFrameElement;

  #mutationObserver: MutationObserver;

  async firstUpdated() {
    await wait(() => this.#loaded);
    const obeserver = (this.#mutationObserver = new MutationObserver(() => {
      const editor = this.editor;
      if (
        editor.childNodes[0]?.nodeType === 3 &&
        editor.childNodes[0].textContent.trim()
      ) {
        const textNode = editor.childNodes[0];
        const text = textNode.textContent;
        const div = document.createElement("div");
        div.textContent = text;
        textNode.replaceWith(div);
        const selection = this.iframe.contentWindow.getSelection();
        const range = selection.getRangeAt(0);
        range.collapse();
      }
      this.dispatchEvent(new CustomEvent("vis-change", { detail: { editor } }));
    }));
    obeserver.observe(this.iframe.contentWindow.document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#mutationObserver.disconnect();
  }

  @property({ type: String })
  editorStyle: string = "";

  insert(node: Node | string) {
    if (this.editor) {
      this.editor.focus();
      const selection = this.iframe.contentWindow.getSelection();
      const range = selection.getRangeAt(0);
      if (typeof node === "string") {
        node = document.createTextNode(node);
      }
      range.insertNode(node);
      range.collapse();
    }
  }

  updated(map: Map<string, any>) {
    if (map.has("value") && this.#loaded) {
      const body = this.iframe.contentWindow.document.body;

      render("", body);
      render(
        html`
          <div
            id="editor"
            class="editor"
            spellcheck="false"
            contenteditable="true"
          >
            ${this.value}
          </div>
        `,
        body
      );
    }

    if (map.has("editorStyle") && this.#loaded) {
      const head = this.iframe.contentWindow.document.querySelector("head");
      render(
        html`<style>
          ${unsafeCSS(this.editorStyle)}
        </style>`,
        head
      );
    }
  }

  @property({ attribute: false })
  value: unknown = "";

  render() {
    return guard(
      true,
      () => html`
        <iframe
          @load=${() => {
            this.#loaded = true;
            this.requestUpdate("value");
            this.requestUpdate("editorStyle");
          }}
          srcdoc=${`
          <head>
          <style>
            html,body{
                margin:0;
                padding:0;
                height:100%;
                width:100%;
            }
            #editor{
              height:100%;
              outline:none;
            }

            #editor > div {
              min-height: 1rem;
            }
          </style>
          </head>
          <body></body>
          `}
        ></iframe>
      `
    );
  }
}
