import { InternalNamePath } from 'rc-field-form/es/interface';
interface KV<T> {
    key: InternalNamePath;
    value: T;
}
declare class NameMap<T> {
    private list;
    set(key: InternalNamePath, value: T): void;
    get(key: InternalNamePath): T | undefined;
    update(key: InternalNamePath, updater: (origin: T | undefined) => T | null): void;
    delete(key: InternalNamePath): void;
    map<U>(callback: (kv: KV<T>) => U): U[];
    forEach<U>(callback: (kv: KV<T>) => U): void;
    toJSON(): {
        [name: string]: T;
    };
}
export default NameMap;
