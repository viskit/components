import * as Rematrix from "rematrix";
import { Matrix3D } from "rematrix";
export class Translate {
  #transformMatrix3D: Matrix3D;
  #transition: string = "";
  #transform: string = "";

  transition(duration = 0) {
    const transitionStyle = `transform ${duration / 1000}s linear`;
    const transition = this.el.style.transition;
    if (transition) {
      if (transition.indexOf("transform") !== -1) {
        const items = transition
          .split(",")
          .filter((item) => item.indexOf("transform") === -1);

        items.push(transition);
        return items.join(",");
      } else {
        return transition + "," + transitionStyle;
      }
    } else {
      return transitionStyle;
    }
  }

  translate({ x, y }: { x?: number; y?: number }) {
    if (typeof x === "number" || typeof y === "number") {
      const arr = [this.#transformMatrix3D];
      if (typeof x === "number") {
        arr.push(Rematrix.translateX(x));
      }

      if (typeof y === "number") {
        arr.push(Rematrix.translateY(y));
      }

      const result = arr.reduce(Rematrix.multiply);
      return Rematrix.toString(result);
    }
  }

  get recallTransition() {
    return this.#transition;
    this.el.style.transform = this.#transform;
  }

  get recallTransform() {
    return this.#transform;
  }

  constructor(private el: HTMLElement) {
    this.#transformMatrix3D = Rematrix.fromString(
      getComputedStyle(this.el).transform
    );
    this.#transition = this.el.style.transition;
    this.#transform = this.el.style.transform;
  }
}
