import { ReactiveController } from "lit";
import { ScrollContent } from "./index";
export declare class ScrollEventHandler implements ReactiveController {
    #private;
    private sc;
    constructor(sc: ScrollContent);
    hostConnected(): Promise<void>;
    hostDisconnected(): void;
}
