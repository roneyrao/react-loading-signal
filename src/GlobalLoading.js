/**
 * Created by roney on 2017/9/20.
 */

import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { Spinning } from './themes';
import { LoadingEvent, EVENT_LOCAL_HADNDLED } from './LoadingEvent';
import styles from './styles';

// can theme be changed? can multiple themes coexist? no! global is singleton, one sign for many loadings.
export class GlobalLoadingComp extends React.Component {
  static propTypes = {
    theme: PropTypes.func,
    masked: PropTypes.bool,
    closable: PropTypes.bool,
  };
  static defaultProps = {
    theme: Spinning,
    masked: false,
    closable: false, // if the masked overlay can be closed when click;
  };
  state = {
    shown: false,
    messages: {},
  };

  loadingCount = 0; // multiple loadings may be pending meantime;

  generateID() {
    return `loading${new Date().valueOf()}${Math.round(Math.random() * 10000)}`;
  }
  addLoading(msg = '') {
    this.loadingCount++;
    const id = this.generateID();
    const newState = { shown: true };
    if (msg) {
      newState.messages = { ...this.state.messages, [id]: msg };
    }
    this.setState(newState);
    return id;
  }
  removeLoading(id) {
    // console.log('remove loading', id);
    this.loadingCount--;
    if (this.loadingCount < 0) {
      // unknown exception;
      // console.error('loading removed more than once', id);
      this.loadingCount = 0;
    }
    delete this.state.messages[id];
    //* ********************* ???????????????????? immutable??????????
    this.setState({ shown: !!this.loadingCount, messages: this.state.messages });
  }
  clickHandler = () => {
    if (this.props.masked && this.props.closable) {
      this.loadingCount = 0;
      this.setState({ shown: false, messages: {} });
    }
  };

  render() {
    // console.log('this.props.theme', this.props.theme);
    const msgList = Object.keys(this.state.messages).length ? (
      <ul className={styles.messageList}>
        {Object.entries(this.state.messages).map(([k, v]) => <li key={k}>{v}</li>)}
      </ul>
    ) : (
      ''
    );
    // console.log('msgList', msgList);
    return (
      <div
        className={this.props.masked ? styles.globalMasked : styles.global}
        style={{ visibility: this.state.shown ? 'visible' : 'hidden' }}
        onClick={this.clickHandler}
      >
        <this.props.theme message={msgList} />
      </div>
    );
  }
}

export default class GlobalLoading {
  static singleInst = null;

  Comp = null;
  root = null;
  localHandled = false;
  constructor(theme, masked, closable) {
    if (this.constructor.singleInst) {
      // singleton: mount global once for ever; but still update its properties;
      this.render(theme, masked, closable);
      return this.constructor.singleInst;
    }
    this.constructor.singleInst = this;

    this.root = document.createElement('div');
    console.error('aaaaaaaaaaa', this.root);
    this.root.style.position = 'relative';
    this.render(theme, masked, closable);
    document.body.appendChild(this.root);
    LoadingEvent.on(EVENT_LOCAL_HADNDLED, this.flagLocalHandled);
  }
  flagLocalHandled = () => {
    this.localHandled = true;
  };
  render(theme, masked, closable) {
    aaaddafaaa;
    this.Comp = render(<GlobalLoadingComp {...{ theme, masked, closable }} />, this.root);
  }
  open(msg) {
    // wait for local loading to handle;
    const promise = new Promise((resolve, reject) => {
      window.setTimeout(() => {
        // console.log('this.localHandled', this.localHandled);
        if (this.localHandled) {
          // bypass this loading, and reset flag;
          this.localHandled = false;
          reject();
        } else {
          resolve(this.Comp.addLoading(msg));
        }
      }, 10);
    });
    promise.catch(() => {
      // console.log('global loading bypassed');
    }); // prevent error bubbling up;
    return promise;
  }
  close(promise) {
    if (!promise) return;
    promise.then(
      (id) => {
        this.Comp.removeLoading(id);
      },
      () => {
        // console.log('bypassed was not shown')
      },
    );
  }
}
