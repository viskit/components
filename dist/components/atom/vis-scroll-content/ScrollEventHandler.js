var _ScrollEventHandler_started, _ScrollEventHandler_touched, _ScrollEventHandler_ct, _ScrollEventHandler_handle, _ScrollEventHandler_touchstartHandler, _ScrollEventHandler_touchendHandler, _ScrollEventHandler_scrollEndHandler;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { debounce } from "lodash";
export class ScrollEventHandler {
    constructor(sc) {
        this.sc = sc;
        _ScrollEventHandler_started.set(this, false);
        _ScrollEventHandler_touched.set(this, false);
        _ScrollEventHandler_ct.set(this, void 0);
        _ScrollEventHandler_handle.set(this, debounce(() => {
            clearTimeout(__classPrivateFieldGet(this, _ScrollEventHandler_ct, "f"));
            if (!this.sc.scrollEvents || this.sc.disable) {
                if (__classPrivateFieldGet(this, _ScrollEventHandler_started, "f")) {
                    this.sc.dispatchEvent(new CustomEvent("scroll-end"));
                }
            }
            else {
                if (!__classPrivateFieldGet(this, _ScrollEventHandler_touched, "f")) {
                    __classPrivateFieldSet(this, _ScrollEventHandler_ct, setTimeout(() => {
                        this.sc.dispatchEvent(new CustomEvent("scroll-end"));
                    }, 200), "f");
                }
                if (__classPrivateFieldGet(this, _ScrollEventHandler_started, "f")) {
                    this.sc.dispatchEvent(new CustomEvent("scrolling"));
                }
                else {
                    __classPrivateFieldSet(this, _ScrollEventHandler_started, true, "f");
                    this.sc.dispatchEvent(new CustomEvent("scroll-start"));
                }
            }
        }));
        _ScrollEventHandler_touchstartHandler.set(this, () => {
            __classPrivateFieldSet(this, _ScrollEventHandler_touched, true, "f");
        });
        _ScrollEventHandler_touchendHandler.set(this, () => {
            __classPrivateFieldSet(this, _ScrollEventHandler_touched, false, "f");
            if (__classPrivateFieldGet(this, _ScrollEventHandler_started, "f")) {
                this.sc.dispatchEvent(new CustomEvent("scroll-end"));
            }
        });
        _ScrollEventHandler_scrollEndHandler.set(this, () => {
            __classPrivateFieldSet(this, _ScrollEventHandler_started, false, "f");
            const { scrollHeight, scrollTop, clientHeight } = this.sc.content;
            if (scrollTop === 0) {
                this.sc.dispatchEvent(new CustomEvent("scroll-top"));
            }
            else if (scrollHeight === clientHeight + scrollTop) {
                this.sc.dispatchEvent(new CustomEvent("scroll-bottom"));
            }
        });
        sc.addController(this);
    }
    async hostConnected() {
        await this.sc.updateComplete;
        this.sc.content.addEventListener("scroll", __classPrivateFieldGet(this, _ScrollEventHandler_handle, "f"));
        this.sc.addEventListener("scroll-end", __classPrivateFieldGet(this, _ScrollEventHandler_scrollEndHandler, "f"));
        this.sc.content.addEventListener("touchstart", __classPrivateFieldGet(this, _ScrollEventHandler_touchstartHandler, "f"));
        this.sc.content.addEventListener("touchend", __classPrivateFieldGet(this, _ScrollEventHandler_touchendHandler, "f"));
        this.sc.content.addEventListener("touchcancel", __classPrivateFieldGet(this, _ScrollEventHandler_touchendHandler, "f"));
    }
    hostDisconnected() {
        this.sc.content.removeEventListener("scroll", __classPrivateFieldGet(this, _ScrollEventHandler_handle, "f"));
        this.sc.removeEventListener("scroll-end", __classPrivateFieldGet(this, _ScrollEventHandler_scrollEndHandler, "f"));
        this.sc.content.removeEventListener("touchstart", __classPrivateFieldGet(this, _ScrollEventHandler_touchstartHandler, "f"));
        this.sc.content.removeEventListener("touchend", __classPrivateFieldGet(this, _ScrollEventHandler_touchendHandler, "f"));
        this.sc.content.removeEventListener("touchcancel", __classPrivateFieldGet(this, _ScrollEventHandler_touchendHandler, "f"));
    }
}
_ScrollEventHandler_started = new WeakMap(), _ScrollEventHandler_touched = new WeakMap(), _ScrollEventHandler_ct = new WeakMap(), _ScrollEventHandler_handle = new WeakMap(), _ScrollEventHandler_touchstartHandler = new WeakMap(), _ScrollEventHandler_touchendHandler = new WeakMap(), _ScrollEventHandler_scrollEndHandler = new WeakMap();
