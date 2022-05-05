import { __decorate } from "tslib";
import { LitElement } from "lit";
import { html } from "lit/static-html";
import { state, customElement, query } from "lit/decorators.js";
import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { html as htmlLang } from "@codemirror/lang-html";
let Demo = class Demo extends LitElement {
    firstUpdated(_changedProperties) {
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
            view.setState(EditorState.create({
                doc: this.innerHTML,
                extensions: [basicSetup, htmlLang()],
            }));
        });
    }
    render() {
        return html `<div class="wrap">
      <div class="demo"><slot></slot></div>
      <div class="code"></div>
    </div>`;
    }
};
__decorate([
    state()
], Demo.prototype, "source", void 0);
__decorate([
    query(".code")
], Demo.prototype, "codeEl", void 0);
Demo = __decorate([
    customElement("vis-demo")
], Demo);
export { Demo };
