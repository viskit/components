import "../../src";
import { Accordion, Switcher, Sliding } from "../../src";
import { html } from "lit";
export default [
  {
    name: "Accordion",
    des: "Accordion web component",
    demo: html`<vis-accordion></vis-accordion>`,
  },

  {
    name: "Switcher",
    des: "Switcher web component",
    demo: html`<vis-switcher>
      <button class="create">create</button>
      <button class="edit">edit</button>
      <button class="delete">delete</button>
    </vis-switcher>`,
  },

  {
    name: "Sliding",
    des: "Sliding web component",
    demo: html`<vis-sliding>
      <vis-sliding
        @slide-drag=${(e) => e.target.accordion.slide(e.detail.deltaX)}
        id="vis-sliding1"
      >
        <div style="height:100px">hello sliding me</div>
        <button slot="start0">AAA</button>
        <button slot="start1">BBB</button>
        <button slot="start2">CCC</button>

        <button class="create" slot="end0">create</button>
        <button class="edit" slot="end1">edit</button>
        <button class="delete" slot="end2">delete</button>
      </vis-sliding>
    </vis-sliding>`,
  },
];
