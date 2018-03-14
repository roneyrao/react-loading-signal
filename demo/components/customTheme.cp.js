import React, { Component as Comp } from 'react';

export default class TxtTheme extends Comp {
  static Symbols = ['--', '\\', '|', '/'];
  symLen = this.constructor.Symbols.length;
  symIndex = 0;
  state = { symbol: '' };
  clearTimer() {
    if (this.timer) {
      window.clearInterval(this.timer);
    }
    this.timer = null;
  }
  startSpinning() {
    this.timer = window.setInterval(() => {
      this.symIndex = (this.symIndex + 1) % this.symLen;
      this.setState({ symbol: this.constructor.Symbols[this.symIndex] });
    }, 200);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      if (nextProps.active === true) {
        this.startSpinning();
      } else {
        this.clearTimer();
      }
    }
  }
  componentWillUnmount() {
    this.clearTimer();
  }
  render() {
    return <div>Loading <span style={{ display: 'inline-block', width: '2em' }}>{this.state.symbol}</span></div>;
  }
}
