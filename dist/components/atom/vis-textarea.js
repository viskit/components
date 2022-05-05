var _Textarea_loaded, _Textarea_mutationObserver;
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from "tslib";
import { LitElement, html, css, render, unsafeCSS, } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { guard } from "lit/directives/guard.js";
import { wait } from "../../lib/wait";
let Textarea = class Textarea extends LitElement {
    constructor() {
        super(...arguments);
        _Textarea_loaded.set(this, false);
        _Textarea_mutationObserver.set(this, void 0);
        this.editorStyle = "";
        this.value = "";
    }
    get editor() {
        return this.iframe.contentWindow.document.querySelector("#editor");
    }
    async firstUpdated() {
        await wait(() => __classPrivateFieldGet(this, _Textarea_loaded, "f"));
        const obeserver = (__classPrivateFieldSet(this, _Textarea_mutationObserver, new MutationObserver(() => {
            const editor = this.editor;
            if (editor.childNodes[0]?.nodeType === 3 &&
                editor.childNodes[0].textContent.trim()) {
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
        }), "f"));
        obeserver.observe(this.iframe.contentWindow.document.body, {
            childList: true,
            subtree: true,
            characterData: true,
        });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        __classPrivateFieldGet(this, _Textarea_mutationObserver, "f").disconnect();
    }
    insert(node) {
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
        if (map.has("editorStyle") && __classPrivateFieldGet(this, _Textarea_loaded, "f")) {
            const head = this.iframe.contentWindow.document.querySelector("head");
            render(html `<style>
          ${unsafeCSS(this.editorStyle)}
        </style>`, head);
        }
    }
    render() {
        return guard(true, () => html `
        <iframe
          @load=${() => {
            __classPrivateFieldSet(this, _Textarea_loaded, true, "f");
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
      `);
    }
};
_Textarea_loaded = new WeakMap(), _Textarea_mutationObserver = new WeakMap();
Textarea.styles = css `
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
__decorate([
    query("iframe")
], Textarea.prototype, "iframe", void 0);
__decorate([
    property({ type: String })
], Textarea.prototype, "editorStyle", void 0);
__decorate([
    property({ attribute: false })
], Textarea.prototype, "value", void 0);
Textarea = __decorate([
    customElement("vis-textarea")
], Textarea);
export { Textarea };
