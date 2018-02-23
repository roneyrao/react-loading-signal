import React from 'react';
import Block from './blockWrapper';
import ControlCtnr from './control.ct';

let ix = 0;
export default function wrapper(Loading, title, desc) {
  ix++;
  function GetLoadingControl(_ix) {
    return function LoadingControl() {
      return <ControlCtnr ix={_ix}>{Loading}</ControlCtnr>;
    };
  }
  return Block(GetLoadingControl(ix), title, desc);
}
