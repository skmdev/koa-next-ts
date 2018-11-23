import { action, observable } from 'mobx';
import { useStaticRendering } from 'mobx-react';
import { isServer } from '../../common/utils';
import Counter from './counter';

// const isServer = typeof window === 'undefined';
useStaticRendering(isServer());

class Model {
  @observable public counter: Counter;
  @observable public lastUpdate = 0;
  @observable public light = false;
  timer: NodeJS.Timeout;

  constructor(initialData: Partial<Model> = {}) {
    this.counter = new Counter();
    this.lastUpdate =
      initialData.lastUpdate != null ? initialData.lastUpdate : Date.now();
    this.light = !!initialData.light;
  }

  @action
  public start() {
    this.lastUpdate = Date.now();
    this.timer = setInterval(() => {
      this.lastUpdate = Date.now();
      this.light = true;
    }, 1000);
  }

  stop = () => clearInterval(this.timer);
}

export default Model;

let model = null;

export function initializeStore(initialData?: any) {
  // Always make a new store if server, otherwise state is shared between requests

  if (isServer()) {
    return new Model(initialData);
  }
  if (model === null) {
    model = new Model(initialData);
  }
  return model;
}
