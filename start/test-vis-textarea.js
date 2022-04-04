import "../src/components/atom/vis-textarea";
import { html, render } from "lit";

render(
  html`
    <div>
      <h3>Test vis-textarea component</h3>
      <vis-textarea
        @vis-change=${(e) => console.log(e.detail.editor.innerText)}
        .value=${html` <h5>Hello world</h5> `}
      ></vis-textarea>
    </div>
  `,
  document.body
);

const textarea = document.querySelector("vis-textarea");

(async () => {
  console.log(await textarea.editor);
})();

setTimeout(async () => {
  textarea.value = "1212121";
  await textarea.updateComplete;
  console.log(await textarea.editor);
}, 3000);
