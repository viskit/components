import "../src/components/atom/vis-demo";
import { html, render, css } from "lit";

render(
  html`
    <div>
      <h3>Test vis-demo component</h3>
      <vis-demo>
        <h1>hello !</h1>
        <style>
          h1 {
            color: blue;
          }
        </style>
      </vis-demo>
    </div>
  `,
  document.body
);
