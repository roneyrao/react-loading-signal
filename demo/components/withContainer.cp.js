// @flow
import * as React from 'react';
import { LocalLoading } from '../../src';
import css from '../main.css';

type Props = {
  active: Indicator,
  setActive: (Indicator) => void,
}
type State = {
  ctnr: ?HTMLElement,
}
export default class LocalWithContainer extends React.Component<Props, State> {
  state = { ctnr: null };
  ctnr: ?HTMLElement;
  componentWillReceiveProps(newProps: Props) {
    if (newProps.active !== this.props.active && newProps.active) {
      this.setState({ ctnr: this.ctnr });
    }
  }
  render() {
    return (
      <div>
        <p>text text </p>
        <p>text text </p>
        <div
          className={css.customBox}
          ref={(div: ?HTMLElement) => { this.ctnr = div; }}
        />
        <LocalLoading {...this.props} container={this.state.ctnr} />
      </div>
    );
  }
}
