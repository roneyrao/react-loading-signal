// @flow
import React from 'react';
import { LocalLoading, type Active } from '../../src';
import ControlCtnr from './control.ct';
import Block from '../components/block.cp';
import CustomTheme from '../components/customTheme.cp';

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
        title='Local with customized theme'
      >
        <LocalLoading {...this.state} theme={CustomTheme} />
        <ControlCtnr setActive={this.setActive} setButton={this.setButton} />
      </Block>
    );
  }
}
