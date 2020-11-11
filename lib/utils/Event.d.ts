import { InternalNamePath } from 'rc-field-form/es/interface';
export declare type IHandler = (...params: any) => void;
declare class Event {
    constructor();
    private ___handlers;
    subscribe(path: InternalNamePath, handler: IHandler): void;
    unsubscribe(path: InternalNamePath, handler: IHandler): void;
    publish(path: InternalNamePath, ...parems: any): void;
    getHandlers(): {
        [k: string]: IHandler[];
    };
}
export default Event;
