import { Accordion } from "../../src";
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "./PropertyList";

@customElement("component-home")
export class Home extends LitElement {
  render() {
    return html` <vis-property-list></vis-property-list> `;
  }
}


