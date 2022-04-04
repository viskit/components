var _Textarea_loaded, _Textarea_mutationObserver;
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from "tslib";
import { LitElement, html, css, render } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { guard } from "lit/directives/guard.js";
import { wait } from "../../lib/wait";
let Textarea = class Textarea extends LitElement {
    constructor() {
        super(...arguments);
        _Textarea_loaded.set(this, false);
        _Textarea_mutationObserver.set(this, void 0);
        this.value = "";
    }
    get editor() {
        return new Promise(async (resolve) => {
            await wait(() => __classPrivateFieldGet(this, _Textarea_loaded, "f"));
            resolve(this.iframe.contentWindow.document.querySelector("#editor"));
        });
    }
    async firstUpdated() {
        await wait(() => __classPrivateFieldGet(this, _Textarea_loaded, "f"));
        const obeserver = (__classPrivateFieldSet(this, _Textarea_mutationObserver, new MutationObserver(async () => {
            const editor = await this.editor;
            this.dispatchEvent(new CustomEvent("vis-change", { detail: { editor } }));
        }), "f"));
        obeserver.observe(this.iframe.contentWindow.document.body, {
            childList: true,
            subtree: true,
            characterData: true,
        });
    }
    updated(map) {
        if (map.has("value") && __classPrivateFieldGet(this, _Textarea_loaded, "f")) {
            const body = this.iframe.contentWindow.document.body;
            render("", body);
            render(html `
          <div
            id="editor"
            class="editor"
            spellcheck="false"
            contenteditable="true"
          >
            ${this.value}
          </div>
        `, body);
        }
    }
    render() {
        return guard(true, () => html `
        <iframe
          @load=${() => {
            __classPrivateFieldSet(this, _Textarea_loaded, true, "f");
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
      `);
    }
};
_Textarea_loaded = new WeakMap(), _Textarea_mutationObserver = new WeakMap();
Textarea.styles = css `
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
__decorate([
    query("iframe")
], Textarea.prototype, "iframe", void 0);
__decorate([
    property({ attribute: false })
], Textarea.prototype, "value", void 0);
Textarea = __decorate([
    customElement("vis-textarea")
], Textarea);
export { Textarea };
