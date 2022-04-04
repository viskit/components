import { LitElement, html, css, CSSResultGroup, svg } from "lit";
import { query, customElement } from "lit/decorators.js";
import { debounce, flattenDeep } from "lodash";
import { repeat } from "lit/directives/repeat.js";
import * as geometric from "geometric";

@customElement("vis-artboard")
export class Artboard extends LitElement {
  static styles = [
    css`
      .wrap {
        touch-action: none;
        width: 100%;
        height: 100%;
      }

      svg {
        width: 100%;
        height: 100%;
      }

      svg * {
        stroke-dasharray: 35, 10, 10, 4;
        stroke-linecap: round;
        stroke-width: 1;
        stroke-opacity: 0.5;
        /* stroke: black; */
        fill: url(#orange_red);
        /* fill: black; */
      }
    `,
  ];

  started = false;

  paths: number[][][] = [];
  paths2: number[][] = [];
  paths3: number[][] = [];

  pointermove = debounce((e: PointerEvent) => {
    if (this.started) {
      const index = this.paths.length - 1;
      const path = this.paths[index];

      const currentPoint = [e.clientX, e.clientY];
      const len = path.push(currentPoint);

      const prevIndex = len - 2;
      const prevPoint = path[prevIndex];
      const angle = geometric.lineAngle([prevPoint, currentPoint]);

      let angle2 = angle > 90 ? angle - 90 : 90 - angle;

      this.paths2[index].push(
        geometric.pointTranslate(currentPoint, angle2, 5)
      );

      this.paths3[index].push(
        geometric.pointTranslate(currentPoint, angle2, -5)
      );

      this.requestUpdate();
    }
  }, 0);

  pointerdown(e: PointerEvent) {
    this.started = true;
    this.paths.push([[e.clientX, e.clientY]]);
    // only test
    this.paths2.push([]);
    this.paths3.push([]);
  }

  pointerend(e: PointerEvent) {
    this.started = false;
  }

  render() {
    return html`
      <div
        class="wrap"
        @pointermove=${this.pointermove as any}
        @pointerdown=${this.pointerdown}
        @pointerup=${this.pointerend}
      >
        <svg>
          <defs>
            45%, 60%, 75%,#71378A 80%);
            <linearGradient id="orange_red" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style="stop-color:#E50743;
stop-opacity:1"
              />
              <stop
                offset="15%"
                style="stop-color:#F9870F;
stop-opacity:1"
              />
              <stop
                offset="30%"
                style="stop-color:#E8ED30;
stop-opacity:1"
              />
              <stop
                offset="45%"
                style="stop-color:#3FA62E;
stop-opacity:1"
              />
              <stop
                offset="60%"
                style="stop-color:#3BB4D7;
stop-opacity:1"
              />

              <stop
                offset="75%"
                style="stop-color:#2F4D9E;
stop-opacity:1"
              />

              <stop
                offset="100%"
                style="stop-color:#71378A;
stop-opacity:1"
              />
            </linearGradient>
          </defs>
          ${repeat(
            this.paths2,
            (path, i) => i,
            (p, i) => {
              return svg`
              <path  d=${
                "M" +
                flattenDeep([...p, [...this.paths3[i]].reverse()]).join(" ")
              } />
            `;
            }
          )}
        </svg>
      </div>
    `;
  }
}
