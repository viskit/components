import {
  LitElement,
  html,
  css,
  CSSResultGroup,
  render,
  TemplateResult,
  CSSResult,
  unsafeCSS,
} from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { guard } from "lit/directives/guard.js";

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

  private get editor() {
    return this.iframe.contentWindow.document.querySelector(
      "#editor"
    ) as HTMLElement;
  }

  @query("iframe")
  private iframe: HTMLIFrameElement;

  #loaded = false;

  updated(map: Map<string, any>) {
    if (map.has("value") && this.#loaded) {
      render("", this.editor);
      render(this.config.render(this.value), this.editor);
    }
  }

  // input -------> dom
  insert() {}

  insertImage(src: string) {
    this.editor.focus();
    const selection = this.iframe.contentWindow.getSelection();
    const range = selection.getRangeAt(0);
    const img = new Image();
    img.src = src;
    range.insertNode(img);
    const divEl = document.createElement("div");
    img.parentElement.appendChild(divEl);
    range.selectNode(divEl);
  }

  @property({ type: String })
  value: string = "";

  #parse = (dom: HTMLElement) => {
    const imgs = dom.querySelectorAll("img");
    for (let i = 0; i < imgs.length; i++) {
      const img = imgs.item(i);
      img.insertAdjacentText("beforebegin", `![](${img.src})`);
    }
    const result = dom.innerText;
    return result;
  };

  #render = (value: string) => {
    const fragment = document.createDocumentFragment();

    const divs = value
      .split("\n")
      .map(
        (row) =>
          `<div>${row.split(" ").map((k) => (k ? k : html`&nbsp;`))}</div>`
      );
    fragment.textContent = `
      <style>
        .editor div:nth-of-type(1) {
          color: blue;
        }
      </style>   
      ${divs.join("")}     
    `;

    return fragment;
  };

  config: {
    render: (text: string) => unknown;
    parse: (dom: HTMLElement) => unknown;
  } = {
    render: this.#render,
    parse: this.#parse,
  };

  getValue<T>() {
    const clone = this.editor.cloneNode(true) as HTMLElement;
    clone.style.opacity = "0";
    this.editor.parentElement.insertAdjacentElement("beforeend", clone);
    const result = this.#parse(clone);
    clone.remove();
    return result as unknown as T;
  }

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
          <body >
            <div id="editor" class="editor" spellcheck="false"  contentEditable="true"></div>
          </body>
          `}
        ></iframe>
      `
    );
  }
}
