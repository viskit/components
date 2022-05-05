export declare type SlideEventInit = {
    deltaX: number;
    deltaY: number;
    startX: number;
    startY: number;
    clientX: number;
    clientY: number;
};
export declare class SlideEventDispatcher {
    #private;
    private el;
    constructor(el: HTMLElement);
    removeEventListeners(): void;
}
