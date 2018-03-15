// @flow
import React from 'react';
import { connect } from 'react-redux';

import Control from '../components/control.cp';
import { load, stop } from '../actions';


function mapStateToProps(state, ownProps) {
  return {
    active: state[ownProps.path],
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    load: timeout => dispatch((ownProps.load || load)(
      ownProps.path,
      timeout,
      ownProps.path,
      ownProps.alwaysGlobal,
    )),
    stop: () => dispatch(stop(ownProps.path)),
  };
}

const ControlCtnr = connect(mapStateToProps, mapDispatchToProps)(Control);

export default class ControlWrapper extends React.PureComponent<{}> {
  static ix = 0;

  state = { path: '' };
  componentWillMount() {
    ++this.constructor.ix;
    this.setState({ path: `file_${this.constructor.ix}` });
  }
  render() {
    return <ControlCtnr path={this.state.path} {...this.props} />;
  }
}
