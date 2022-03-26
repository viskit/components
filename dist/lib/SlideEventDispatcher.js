var _SlideEventDispatcher_started, _SlideEventDispatcher_down, _SlideEventDispatcher_startX, _SlideEventDispatcher_startY, _SlideEventDispatcher_pointerdown, _SlideEventDispatcher_pointermove, _SlideEventDispatcher_pointerup;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
export class SlideEventDispatcher {
    constructor(el) {
        this.el = el;
        _SlideEventDispatcher_started.set(this, false);
        _SlideEventDispatcher_down.set(this, false);
        _SlideEventDispatcher_startX.set(this, 0);
        _SlideEventDispatcher_startY.set(this, 0);
        _SlideEventDispatcher_pointerdown.set(this, (e) => {
            __classPrivateFieldSet(this, _SlideEventDispatcher_startX, e.clientX, "f");
            __classPrivateFieldSet(this, _SlideEventDispatcher_startY, e.clientY, "f");
            __classPrivateFieldSet(this, _SlideEventDispatcher_down, true, "f");
        });
        _SlideEventDispatcher_pointermove.set(this, (e) => {
            if (__classPrivateFieldGet(this, _SlideEventDispatcher_down, "f")) {
                const deltaX = e.clientX - __classPrivateFieldGet(this, _SlideEventDispatcher_startX, "f");
                const deltaY = e.clientY - __classPrivateFieldGet(this, _SlideEventDispatcher_startY, "f");
                if (__classPrivateFieldGet(this, _SlideEventDispatcher_started, "f")) {
                    this.el.dispatchEvent(new CustomEvent("slide-drag", {
                        detail: {
                            deltaX,
                            deltaY,
                            startX: __classPrivateFieldGet(this, _SlideEventDispatcher_startX, "f"),
                            startY: __classPrivateFieldGet(this, _SlideEventDispatcher_startY, "f"),
                            clientX: e.clientX,
                            clientY: e.clientY,
                        },
                    }));
                }
                else {
                    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
                        __classPrivateFieldSet(this, _SlideEventDispatcher_started, true, "f");
                        this.el.dispatchEvent(new CustomEvent("slide-start", {
                            detail: {
                                deltaX,
                                deltaY,
                                startX: __classPrivateFieldGet(this, _SlideEventDispatcher_startX, "f"),
                                startY: __classPrivateFieldGet(this, _SlideEventDispatcher_startY, "f"),
                                clientX: e.clientX,
                                clientY: e.clientY,
                            },
                        }));
                    }
                }
            }
        });
        _SlideEventDispatcher_pointerup.set(this, (e) => {
            if (__classPrivateFieldGet(this, _SlideEventDispatcher_started, "f")) {
                this.el.dispatchEvent(new CustomEvent("slide-end", {
                    detail: {
                        deltaX: e.clientX - __classPrivateFieldGet(this, _SlideEventDispatcher_startX, "f"),
                        deltaY: e.clientY - __classPrivateFieldGet(this, _SlideEventDispatcher_startY, "f"),
                        startX: __classPrivateFieldGet(this, _SlideEventDispatcher_startX, "f"),
                        startY: __classPrivateFieldGet(this, _SlideEventDispatcher_startY, "f"),
                        clientX: e.clientX,
                        clientY: e.clientY,
                    },
                }));
            }
            __classPrivateFieldSet(this, _SlideEventDispatcher_startX, 0, "f");
            __classPrivateFieldSet(this, _SlideEventDispatcher_startY, 0, "f");
            __classPrivateFieldSet(this, _SlideEventDispatcher_started, false, "f");
            __classPrivateFieldSet(this, _SlideEventDispatcher_down, false, "f");
        });
        el.style.touchAction = "none";
        this.el.addEventListener("pointerdown", __classPrivateFieldGet(this, _SlideEventDispatcher_pointerdown, "f"));
        this.el.addEventListener("pointermove", __classPrivateFieldGet(this, _SlideEventDispatcher_pointermove, "f"));
        this.el.addEventListener("pointerup", __classPrivateFieldGet(this, _SlideEventDispatcher_pointerup, "f"));
        this.el.addEventListener("pointercancel", __classPrivateFieldGet(this, _SlideEventDispatcher_pointerup, "f"));
    }
    removeEventListeners() {
        this.el.removeEventListener("pointerdown", __classPrivateFieldGet(this, _SlideEventDispatcher_pointerdown, "f"));
        this.el.removeEventListener("pointermove", __classPrivateFieldGet(this, _SlideEventDispatcher_pointermove, "f"));
        this.el.removeEventListener("pointerup", __classPrivateFieldGet(this, _SlideEventDispatcher_pointerup, "f"));
    }
}
_SlideEventDispatcher_started = new WeakMap(), _SlideEventDispatcher_down = new WeakMap(), _SlideEventDispatcher_startX = new WeakMap(), _SlideEventDispatcher_startY = new WeakMap(), _SlideEventDispatcher_pointerdown = new WeakMap(), _SlideEventDispatcher_pointermove = new WeakMap(), _SlideEventDispatcher_pointerup = new WeakMap();
