import { action, observable } from 'mobx';

class Clock {
  @observable public lastUpdate = 0;
  @observable public light = false;
  timer: NodeJS.Timeout;

  constructor(initialData: Partial<Clock> = {}) {
    this.lastUpdate = initialData.lastUpdate || Date.now();
    this.light = !!initialData.light;
  }

  @action
  public start = () => {
    this.lastUpdate = Date.now();
    this.timer = setInterval(() => {
      this.lastUpdate = Date.now();
      this.light = true;
    }, 1000);
  };

  stop = () => clearInterval(this.timer);
}

export default Clock;
