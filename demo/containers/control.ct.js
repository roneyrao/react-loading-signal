// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { ThunkAction } from 'redux-thunk';

import Control from '../components/control.cp';
import { load, stop } from '../actions';


function mapStateToProps(state, ownProps) {
  return {
    active: state[ownProps.path],
  };
}

type WrapperProps = {
  path: string,
  load?: typeof load,
  alwaysGlobal?: bool,
}

function mapDispatchToProps(dispatch: Dispatch<ThunkAction>, ownProps: WrapperProps) {
  return {
    load: (timeout: number) => dispatch((ownProps.load || load)(
      ownProps.path,
      timeout,
      undefined,
      ownProps.alwaysGlobal,
    )),
    stop: () => dispatch(stop(ownProps.path)),
  };
}

const ControlWrapper = connect(mapStateToProps, mapDispatchToProps)(Control);

type CtnrProps = {
  load?: typeof load,
  alwaysGlobal?: bool,
}
export default class ControlCtnr extends React.PureComponent<CtnrProps, { path: string }> {
  static ix = 0;

  state = { path: '' };
  componentWillMount() {
    ++this.constructor.ix;
    this.setState({ path: `file_${this.constructor.ix}` });
  }
  render() {
    return <ControlWrapper path={this.state.path} {...this.props} />;
  }
}
