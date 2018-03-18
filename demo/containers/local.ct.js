// @flow
import React from 'react';
import { LocalLoading, type Active } from '../../src';
import { changeGlobalTheme } from '../actions';
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
  state = { active: false, button: undefined };
  render() {
    return (
      <Block
        title='Local'
        desc='When local loading is shown, global one is suppressed'
      >
        <LocalLoading {...this.state} />
        <ControlCtnr setActive={this.setActive} setButton={this.setButton} />
        <button onClick={changeGlobalTheme}>Change Global Theme</button>
      </Block>
    );
  }
}
