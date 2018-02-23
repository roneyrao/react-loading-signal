// @flow
import React from 'react';
import ControlCtnr from './control.ct';
import Block from '../components/block.cp';
import WithContainer from '../components/withContainer.cp';

type State = { active: bool };
export default class LocalWithContainer extends React.Component<{}, State> {
  setActive = (active: bool) => {
    this.setState({ active });
  }
  state = { active: false };
  render() {
    return (
      <Block
        title='Local loading indicator with container specified'
        desc='Loading indicator showed in the specified container instead of parentNode by default'
      >
        <WithContainer active={this.state.active} />
        <ControlCtnr setActive={this.setActive} />
      </Block>
    );
  }
}
