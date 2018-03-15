// @flow
import React from 'react';
import { LocalLoading, type Indicator } from '../../src';
import ControlCtnr from './control.ct';
import Block from '../components/block.cp';

type State = { active: Indicator, button: HTMLElement };

export default class LocalCtnr extends React.PureComponent<{}, State> {
  setActive = (active: Indicator) => {
    this.setState({ active });
  }
  setButton = (button: HTMLElement) => {
    this.setState({ button });
  }
  state = { active: null, button: null };
  render() {
    return (
      <Block
        title='Both global and local'
        desc='When local loading does not intercept, global one is shown also'
      >
        <LocalLoading {...this.state} />
        <ControlCtnr setActive={this.setActive} setButton={this.setButton} alwaysGlobal />
      </Block>
    );
  }
}
