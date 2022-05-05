var _Translate_transformMatrix3D, _Translate_transition, _Translate_transform;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import * as Rematrix from "rematrix";
export class Translate {
    constructor(el) {
        this.el = el;
        _Translate_transformMatrix3D.set(this, void 0);
        _Translate_transition.set(this, "");
        _Translate_transform.set(this, "");
        __classPrivateFieldSet(this, _Translate_transformMatrix3D, Rematrix.fromString(getComputedStyle(this.el).transform), "f");
        __classPrivateFieldSet(this, _Translate_transition, this.el.style.transition, "f");
        __classPrivateFieldSet(this, _Translate_transform, this.el.style.transform, "f");
    }
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
            }
            else {
                return transition + "," + transitionStyle;
            }
        }
        else {
            return transitionStyle;
        }
    }
    translate({ x, y }) {
        if (typeof x === "number" || typeof y === "number") {
            const arr = [__classPrivateFieldGet(this, _Translate_transformMatrix3D, "f")];
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
        return __classPrivateFieldGet(this, _Translate_transition, "f");
        this.el.style.transform = __classPrivateFieldGet(this, _Translate_transform, "f");
    }
    get recallTransform() {
        return __classPrivateFieldGet(this, _Translate_transform, "f");
    }
}
_Translate_transformMatrix3D = new WeakMap(), _Translate_transition = new WeakMap(), _Translate_transform = new WeakMap();
