// @flow
import React from 'react';
import { LocalLoading, type Active } from '../../src';
import ControlCtnr from './control.ct';
import Block from '../components/block.cp';

type State = { active: Active, button?: HTMLElement };
export default class LocalWithoutIndicator extends React.PureComponent<{}, State> {
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
        title='Local without indicator'
        desc='Loading indicator is hidden, showing global one; it still works to disable button'
      >
        <LocalLoading {...this.state} container={false} />
        <ControlCtnr setActive={this.setActive} setButton={this.setButton} />
      </Block>
    );
  }
}
