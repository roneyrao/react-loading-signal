// @flow
import React from 'react';
import { type Indicator } from '../../src';
import ControlCtnr from './control.ct';
import Block from '../components/block.cp';
import WithContainer from '../components/withContainer.cp';

type State = { active: Indicator };
export default class LocalWithContainer extends React.PureComponent<{}, State> {
  setActive = (active: Indicator) => {
    this.setState({ active });
  }
  state = { active: null };
  render() {
    return (
      <Block
        title='Local in specified container'
        desc='Loading indicator is placed in the specified container instead of parentNode by default'
      >
        <WithContainer active={this.state.active} />
        <ControlCtnr setActive={this.setActive} />
      </Block>
    );
  }
}
