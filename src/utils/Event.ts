import { InternalNamePath } from 'rc-field-form/es/interface';

export type IHandler = (...params: any) => void;

class Event {
  constructor() {}

  private ___handlers: { [k: string]: IHandler[] } = {};
  // ___visibleset = new NameMap<NameMap<{ expect: any[]; value: any }>>();

  public subscribe(path: InternalNamePath, handler: IHandler) {
    const key = path.join('.');

    if (!this.___handlers[key]) {
      this.___handlers[key] = [];
    }

    this.___handlers[key].push(handler);
  }

  // 取消订阅
  public unsubscribe(path: InternalNamePath, handler: IHandler) {
    const key = path.join('.');
    if (this.___handlers[key]) {
      this.___handlers[key].filter((m) => m !== handler);
    }
  }

  // 发布事件
  public publish(path: InternalNamePath, ...parems: any) {
    const handlers = this.___handlers[path.join('.')];
    // console.log('___handlers.publish', this.___handlers, handlers, path.join('.'));
    (handlers || []).forEach((handler) => handler(...parems));
  }

  getHandlers() {
    return this.___handlers;
  }
}

export default Event;
