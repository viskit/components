export type SlideEventInit = {
  deltaX: number;
  deltaY: number;
  startX: number;
  startY: number;
  clientX: number;
  clientY: number;
};

export class SlideEventDispatcher {
  constructor(private el: HTMLElement) {
    el.style.touchAction = "none";
    this.el.addEventListener("pointerdown", this.#pointerdown);
    this.el.addEventListener("pointermove", this.#pointermove);
    this.el.addEventListener("pointerup", this.#pointerup);
    this.el.addEventListener("pointercancel", this.#pointerup);
  }

  #started = false;
  #down = false;
  #startX = 0;
  #startY = 0;

  #pointerdown = (e: PointerEvent) => {
    this.#startX = e.clientX;
    this.#startY = e.clientY;
    this.#down = true;
  };

  #pointermove = (e: PointerEvent) => {
    if (this.#down) {
      const deltaX = e.clientX - this.#startX;
      const deltaY = e.clientY - this.#startY;

      if (this.#started) {

        this.el.dispatchEvent(
          new CustomEvent("slide-drag", {
            detail: {
              deltaX,
              deltaY,
              startX: this.#startX,
              startY: this.#startY,
              clientX: e.clientX,
              clientY: e.clientY,
            },
          })
        );
      } else {
        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
          this.#started = true;
          this.el.dispatchEvent(
            new CustomEvent("slide-start", {
              detail: {
                deltaX,
                deltaY,
                startX: this.#startX,
                startY: this.#startY,
                clientX: e.clientX,
                clientY: e.clientY,
              },
            })
          );
        }
      }
    }
  };

  #pointerup = (e: PointerEvent) => {
    if (this.#started) {
      this.el.dispatchEvent(
        new CustomEvent("slide-end", {
          detail: {
            deltaX: e.clientX - this.#startX,
            deltaY: e.clientY - this.#startY,
            startX: this.#startX,
            startY: this.#startY,
            clientX: e.clientX,
            clientY: e.clientY,
          },
        })
      );
    }
    this.#startX = 0;
    this.#startY = 0;
    this.#started = false;
    this.#down = false;
  };

  removeEventListeners(): void {
    this.el.removeEventListener("pointerdown", this.#pointerdown);
    this.el.removeEventListener("pointermove", this.#pointermove);
    this.el.removeEventListener("pointerup", this.#pointerup);
  }
}
