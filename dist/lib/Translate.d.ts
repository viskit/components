export declare class Translate {
    #private;
    private el;
    transition(duration?: number): string;
    translate({ x, y }: {
        x?: number;
        y?: number;
    }): string;
    get recallTransition(): string;
    get recallTransform(): string;
    constructor(el: HTMLElement);
}
