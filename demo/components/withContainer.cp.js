// @flow
import * as React from 'react';
import { type Active, LocalLoading } from '../../src';
import css from '../main.css';

type Props = {
  active: Active,
}
type State = {
  ctnr?: HTMLElement,
}
export default class LocalWithContainer extends React.Component<Props, State> {
  state = {};
  ctnr: ?HTMLElement;
  componentWillReceiveProps(newProps: Props) {
    if (newProps.active !== this.props.active && newProps.active && this.ctnr !== null) {
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
          ref={(div) => { this.ctnr = div; }}
        />
        <LocalLoading {...this.props} container={this.state.ctnr} />
      </div>
    );
  }
}
