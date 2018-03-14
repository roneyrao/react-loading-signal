// @flow
import React from 'react';
import { type Indicator } from '../../src';
import ControlCtnr from './control.ct';
import Block from '../components/block.cp';
import Local from '../components/local.cp';
import CustomTheme from '../components/customTheme.cp';

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
        title='Local with customized theme'
      >
        <Local {...this.state} theme={CustomTheme} />
        <ControlCtnr setActive={this.setActive} setButton={this.setButton} />
      </Block>
    );
  }
}
