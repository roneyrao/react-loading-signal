// @flow
import React from 'react';
import ControlCtnr from './control.ct';
import Block from '../components/block.cp';

export default function Global() {
  return (
    <Block
      title='Global loading indicator'
      desc='Global loading indicator is injected in network/ajax layer. When no local indicator specified for this request, global indicator is shown'
    >
      <ControlCtnr />
      <ControlCtnr />
      <ControlCtnr />
    </Block>
  );
}
