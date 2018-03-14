// @flow
import * as React from 'react';
import css from '../main.css';
import { type Indicator } from '../../src';

type Props = {
  active: Indicator,
  path: string,
  load: (number) => {},
  stop: () => {},
  setButton: (btn: ?HTMLElement) => {},
  setActive: (active: Indicator) => {},
}
type State = { timeout: number, isInfinity: bool };

class Control extends React.Component<Props, State> {
  state = { timeout: 1, isInfinity: true };

  setTimeout = (evt: SyntheticEvent<HTMLInputElement>) => {
    const num = parseInt(evt.currentTarget.value, 10);
    if (!Number.isNaN(num)) {
      this.setState({ timeout: num });
    }
  };
  setInfinity = (evt: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ isInfinity: evt.currentTarget.checked });
  };
  load = () => {
    this.props.load(this.state.isInfinity ? Infinity : this.state.timeout);
  };

  componentWillReceiveProps(newProps: Props) {
    if (newProps.active !== this.props.active && this.props.setActive) {
      this.props.setActive(newProps.active);
    }
  }

  componentDidMount() {
    if (this.props.setButton) {
      this.props.setButton(this.btn);
    }
  }

  render() {
    return (
      <div className={css.control}>
        <button
          onClick={this.load}
          ref={(btn) => { this.btn = btn; }}
        >
          Load {this.props.path}
        </button>
        <button
          onClick={this.props.stop}
          style={{
            display: this.props.active && this.state.isInfinity ? 'inline-block' : 'none',
          }}
        >
          Stop
        </button>
        <span
          style={{
            display: this.props.active ? 'none' : 'inline-block',
          }}
        >
          stop after
          <input
            type='number'
            min='0'
            disabled={this.state.isInfinity}
            value={this.state.timeout}
            onChange={this.setTimeout}
          />
          sec
          <input type='checkbox' checked={this.state.isInfinity} onChange={this.setInfinity} />
          Infinity
        </span>
      </div>
    );
  }
}

export default Control;
