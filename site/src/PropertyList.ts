import { LitElement, html, css, ReactiveElement } from "lit";
import { property, customElement } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { Accordion, Switcher, Sliding } from "../../src";
import list from "./list";

@customElement("vis-property-list")
export class PropertyList extends LitElement {
  render() {
    return html`
      <ul>
        ${repeat(
          list,
          (item) => item.name,
          (item) => {
            return html`
              <li>
                <h3>${item.name}</h3>
                ${item.demo}
              </li>
            `;
          }
        )}
      </ul>
    `;
  }
}
