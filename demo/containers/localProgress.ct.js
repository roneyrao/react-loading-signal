// @flow
import React from 'react';
import { type Indicator } from '../../src';
import ControlCtnr from './control.ct';
import Block from '../components/block.cp';
import Progress from '../components/progress.cp';
import { loadProgress } from '../actions';

type Status = { loading: Indicator, progress: Number };
type State = { active: Indicator, message: { progress: Number }};
export default class LocalProgress extends React.PureComponent<{}, State> {
  setStatus = (status: Status) => {
    this.setState({ active: status.active, message: { progress: status.progress } });
  }
  state = {};
  render() {
    return (
      <Block
        title='Local showing Progressing'
        desc='Apply dedicated progressing theme'
      >
        <Progress {...this.state} />
        <ControlCtnr load={loadProgress} setActive={this.setStatus} />
      </Block>
    );
  }
}
