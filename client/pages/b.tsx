import React from 'react';
import { inject, observer } from 'mobx-react';
import Clock from '../components/Clock';
import Model from '../../client/models';

interface IProps {
  model: Model;
}

@inject('model')
@observer
class B extends React.Component<IProps> {
  componentDidMount() {
    this.props.model.start();
  }

  componentWillUnmount() {
    this.props.model.stop();
  }

  public render() {
    return (
      <div>
        <button onClick={this.props.model.counter.add}>+</button>
        {this.props.model.counter.count}
        <button onClick={this.props.model.counter.minus}>-</button>
        <Clock
          lastUpdate={this.props.model.lastUpdate}
          light={this.props.model.light}
        />
      </div>
    );
  }
}

export default B;
