import { ReactiveController } from "lit";
import { ScrollContent } from "./index";
import { debounce } from "lodash";

export class ScrollEventHandler implements ReactiveController {
  constructor(private sc: ScrollContent) {
    sc.addController(this);
  }

  #started = false;
  #touched = false;
  #ct: any;

  #handle = debounce(() => {
    clearTimeout(this.#ct);

    if (!this.sc.scrollEvents || this.sc.disable) {
      if (this.#started) {
        this.sc.dispatchEvent(new CustomEvent("scroll-end"));
      }
    } else {
      if (!this.#touched) {
        this.#ct = setTimeout(() => {
          this.sc.dispatchEvent(new CustomEvent("scroll-end"));
        }, 200);
      }

      if (this.#started) {
        this.sc.dispatchEvent(new CustomEvent("scrolling"));
      } else {
        this.#started = true;
        this.sc.dispatchEvent(new CustomEvent("scroll-start"));
      }
    }
  });

  #touchstartHandler = () => {
    this.#touched = true;
  };

  #touchendHandler = () => {
    this.#touched = false;
    if (this.#started) {
      this.sc.dispatchEvent(new CustomEvent("scroll-end"));
    }
  };

  #scrollEndHandler = () => {
    this.#started = false;
    const { scrollHeight, scrollTop, clientHeight } = this.sc.content;
    if (scrollTop === 0) {
      this.sc.dispatchEvent(new CustomEvent("scroll-top"));
    } else if (scrollHeight === clientHeight + scrollTop) {
      this.sc.dispatchEvent(new CustomEvent("scroll-bottom"));
    }
  };

  async hostConnected() {
    await this.sc.updateComplete;

    this.sc.content.addEventListener("scroll", this.#handle);
    this.sc.addEventListener("scroll-end", this.#scrollEndHandler);
    this.sc.content.addEventListener("touchstart", this.#touchstartHandler);
    this.sc.content.addEventListener("touchend", this.#touchendHandler);
    this.sc.content.addEventListener("touchcancel", this.#touchendHandler);
  }

  hostDisconnected() {
    this.sc.content.removeEventListener("scroll", this.#handle);
    this.sc.removeEventListener("scroll-end", this.#scrollEndHandler);

    this.sc.content.removeEventListener("touchstart", this.#touchstartHandler);
    this.sc.content.removeEventListener("touchend", this.#touchendHandler);
    this.sc.content.removeEventListener("touchcancel", this.#touchendHandler);
  }
}
