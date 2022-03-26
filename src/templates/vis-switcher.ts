import { html, css } from "lit";
import { classMap, ClassInfo } from "lit/directives/class-map.js";
import fillStyle from "../css/fill";
import onlyStyle from "../css/only";

export default (slot: any = "", classes?: string[]) => {
  const map = {};
  classes?.forEach((name) => (map[name] = true));

  return html`
    <div
      class=${classMap({
        ...map,
        "vis-fill-container": true,
        "vis-only-container": true,
      })}
    >
      ${slot}
    </div>
  `;
};

export { fillStyle, onlyStyle };
