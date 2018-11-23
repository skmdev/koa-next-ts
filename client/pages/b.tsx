import React from 'react';
import { inject, observer } from 'mobx-react';
import Clock from '../components/Clock';
import Store from '../../client/stores';

interface IProps {
  store: Store;
}

@inject('store')
@observer
class B extends React.Component<IProps> {
  componentDidMount() {
    this.props.store.clock.start();
  }

  componentWillUnmount() {
    this.props.store.clock.stop();
  }

  public render() {
    return (
      <div>
        <button onClick={this.props.store.counter.add}>+</button>
        {this.props.store.counter.count}
        <button onClick={this.props.store.counter.minus}>-</button>
        <Clock
          lastUpdate={this.props.store.clock.lastUpdate}
          light={this.props.store.clock.light}
        />
      </div>
    );
  }
}

export default B;
