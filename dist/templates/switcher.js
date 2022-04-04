import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";
import fillStyle from "../css/fill";
import onlyStyle from "../css/only";
export default (slot = "", classes) => {
    const map = {};
    classes?.forEach((name) => (map[name] = true));
    return html `
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
