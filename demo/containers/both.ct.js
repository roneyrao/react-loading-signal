// @flow
import React from 'react';
import { LocalLoading, type Active } from '../../src';
import ControlCtnr from './control.ct';
import Block from '../components/block.cp';

type State = { active: Active, button?: HTMLElement };

export default class LocalCtnr extends React.PureComponent<{}, State> {
  setActive = (active: Active) => {
    this.setState({ active });
  }
  setButton = (button: HTMLElement) => {
    this.setState({ button });
  }
  state = { active: false };
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
