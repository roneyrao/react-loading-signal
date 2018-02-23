// @flow
import * as React from 'react';
import { LocalLoading } from '../../src';

type Props = {
  active: bool,
}
type State = {
  ctnr: ?HTMLElement,
}
export default class LocalWithContainer extends React.Component<Props, State> {
  state = { ctnr: null };
  ctnr: ?HTMLElement;
  componentDidMount() {
    if (!this.state.ctnr) {
      this.setState({ ctnr: this.ctnr });
    }
  }
  render() {
    return (
      <div>
        <p>text text </p>
        <p>text text </p>
        <div
          ref={(div: ?HTMLElement) => { this.ctnr = div; }}
        />
        <p>text text </p>
        <p>text text </p>
        <LocalLoading {...this.props} container={this.state.ctnr} />
      </div>
    );
  }
}
