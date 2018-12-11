import { observable } from 'mobx';
import { useStaticRendering } from 'mobx-react';
import { isServer } from '../../common/utils';
import Counter from './counter';
import Clock from './clock';

// const isServer = typeof window === 'undefined';
useStaticRendering(isServer());

class Store {
  @observable public counter: Counter = new Counter();
  @observable public clock: Clock = new Clock();

  constructor(initialData: Partial<Store> = {}) {
    this.counter = new Counter(initialData.counter);
    this.clock = new Clock(initialData.clock);
  }
}

export default Store;

let store = null;

export function initializeStore(initialData?: any) {
  // Always make a new store if server, otherwise state is shared between requests

  if (isServer()) {
    return new Store(initialData);
  }
  if (store === null) {
    store = new Store(initialData);
  }
  return store;
}
