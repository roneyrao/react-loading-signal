// @flow
import React from 'react';
import { connect } from 'react-redux';

import Control from '../components/control.cp';
import { load, stop } from '../actions/general.act';


function mapStateToProps(state, ownProps) {
  return {
    active: state[ownProps.path],
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    load: timeout => dispatch(load(ownProps.path, timeout, ownProps.path)),
    stop: () => dispatch(stop(ownProps.path)),
  };
}

const ControlCtnr = connect(mapStateToProps, mapDispatchToProps)(Control);

let ix = 0;
export default function ControlWrapper(props: {}) {
  return <ControlCtnr path={`file_${++ix}`} {...props} />;
}
