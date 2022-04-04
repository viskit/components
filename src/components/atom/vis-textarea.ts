import { LitElement, html, css, render, PropertyValueMap } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { guard } from "lit/directives/guard.js";
import { wait } from "../../lib/wait";
@customElement("vis-textarea")
export class Textarea extends LitElement {
  static styles = css`
    iframe {
      border: none;
      outline: 0px;
      min-height: 100vh;
    }
    :host {
      contain: content;
      width: 100%;
    }
  `;

  #loaded = false;

  get editor() {
    return new Promise(async (resolve) => {
      await wait(() => this.#loaded);
      resolve(
        this.iframe.contentWindow.document.querySelector(
          "#editor"
        ) as HTMLElement
      );
    });
  }

  @query("iframe")
  private iframe: HTMLIFrameElement;

  #mutationObserver: MutationObserver;

  async firstUpdated() {
    await wait(() => this.#loaded);
    const obeserver = (this.#mutationObserver = new MutationObserver(
      async () => {
        const editor = await this.editor;
        this.dispatchEvent(
          new CustomEvent("vis-change", { detail: { editor } })
        );
      }
    ));
    obeserver.observe(this.iframe.contentWindow.document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
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
          }}
          srcdoc=${`
          <head>
          <style>
            html,body{
                margin:0;padding:0;
                min-height:100%;
                width:100%;
                --font-size: 1.2rem;
                font-size: var(--font-size);
            }
            div{
              min-height:var(--font-size);
            }
          </style>
          </head>
          <body>
          </body>
          `}
        ></iframe>
      `
    );
  }
}
