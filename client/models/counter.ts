import { action, observable } from 'mobx';

class Counter {
  @observable public count: number = 0;
  @action
  add = () => {
    this.count = this.count + 1;
  };
  @action
  minus = () => {
    this.count = this.count - 1;
  };
}

export default Counter;
