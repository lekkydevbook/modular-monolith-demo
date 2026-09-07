import { EventEmitter } from 'events';

const emitter = new EventEmitter();

export const eventBus = {
  publish: (event: string, payload: any): void => {
    emitter.emit(event, payload);
  },
  subscribe: (event: string, handler: (payload: any) => void): void => {
    emitter.on(event, handler);
  }
};
