// @flow
import React from 'react';
import { type Indicator } from '../../src';
import ControlCtnr from './control.ct';
import Block from '../components/block.cp';
import WithoutIndicator from '../components/withoutIndicator.cp';

type State = { active: Indicator, button: HTMLElement };
export default class LocalWithoutIndicator extends React.PureComponent<{}, State> {
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
        title='Local in specified container'
        desc='Loading indicator is placed in the specified container instead of parentNode by default'
      >
        <WithoutIndicator {...this.state} />
        <ControlCtnr setActive={this.setActive} setButton={this.setButton} />
      </Block>
    );
  }
}
