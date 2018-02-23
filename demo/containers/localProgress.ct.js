import React, { Component as Comp } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProgressCp from '../components/progress.cp';
import load from '../actions/progress.act';
import wrap from './wrapLoading';

class Control extends Comp {
  static caption(prg) {
    return `${prg} was downloaded.`;
  }
  render() {
    return (
      <div>
        <ProgressCp
          message={{ progress: this.props.progress, caption: Control.caption }}
          active={this.props.active}
          button={this.button}
        />
        <div>
          <button
            onClick={this.load}
            ref={(btn) => {
              this.button = btn;
            }}
          >
            Load
          </button>
        </div>
      </div>
    );
  }
}
Control.propTypes = {
  active: PropTypes.bool,
  load: PropTypes.func,
  progress: PropTypes.number,
};

function mapStateToProps({ progress }) {
  return { progress };
}

function mapDispatchToProps(dispatch) {
  return {
    load: () => dispatch(load),
  };
}

export default wrap(
  connect(mapStateToProps, mapDispatchToProps)(Control),
  'Local loading indicator showing Progressing',
  'apply dedicated progressing theme',
);
