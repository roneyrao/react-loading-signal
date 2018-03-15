// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { render } from 'react-dom';
import { Spinning } from './themes';
// import { LoadingEvent, EVENT_LOCAL_HADNDLED } from './LoadingEvent';
import styles from './styles';


type Props = {
  theme?: React.ComponentType<*>,
  masked?: bool,
  closable?: bool,
};
type State = {
  shown: bool,
  messages: {[string]: Node},
};
type Id = string;
type IdPromise = Promise<Id> | bool;
export opaque type Indicator = IdPromise;

export class GlobalLoadingComp extends Component<Props, State> {
  static generateID(): Id {
    return `loading${new Date().valueOf()}${Math.round(Math.random() * 10000)}`;
  }
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

  addLoading(msg: Node) {
    this.loadingCount++;
    const id = GlobalLoadingComp.generateID();
    const newState: State = { shown: true, messages: {} };
    if (msg) {
      newState.messages = { ...this.state.messages, [id]: msg };
    }
    this.setState(newState);
    return id;
  }
  removeLoading(id: Id) {
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
      this.setState({ shown: false });
    }
  };

  render() {
    const Theme = this.props.theme || Spinning;
    const msgs = this.state.messages;
    const msgList = Object.keys(this.state.messages).length ? (
      <ul className={styles.messageList}>
        {
          // {Object.entries(this.state.messages).map(([k, v]) => <li key={k}>{v}</li>)}
          Object.keys(msgs)
          .map(k => <li key={k}>{msgs[k]}</li>)
        }
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
        <Theme message={msgList} />
      </div>
    );
  }
}

export default class GlobalLoading {
  static singleInst: GlobalLoading;

  Comp: GlobalLoadingComp;
  root: HTMLElement;
  localHandled = false;

  constructor(theme?:Props.theme, masked?:Props.masked, closable?:Props.closable) {
    if (this.constructor.singleInst) {
      // singleton: mount global once for ever; but still update its properties;
      this.constructor.singleInst.render(theme, masked, closable);
      return this.constructor.singleInst;
    }
    this.constructor.singleInst = this;

    this.root = document.createElement('div');
    this.root.style.position = 'relative';
    this.render(theme, masked, closable);
    if (!document.body) throw new Error('Please instantiate GlobalLoading after document.body is accessible');
    document.body.appendChild(this.root);
    // LoadingEvent.on(EVENT_LOCAL_HADNDLED, this.flagLocalHandled);
  }
  // flagLocalHandled = () => {
  //   this.localHandled = true;
  // };
  render(theme?:Props.theme, masked?:Props.masked, closable?:Props.closable) {
    this.Comp = render(<GlobalLoadingComp {...{ theme, masked, closable }} />, this.root);
  }
  open(msg:Node) {
    // wait for local loading to handle,
    // since `Sync` work is performed after `handleTopLevelImpl` in `batchedUpdates`;
    const idProm:IdPromise = new Promise((resolve, reject) => {
      window.setTimeout(() => {
        if (idProm.canceled) {
          // bypass this loading, and reset flag;
          reject();
        } else {
          resolve(this.Comp.addLoading(msg));
        }
      }, 10);
    });
    idProm.catch(() => {
      // console.log('global loading bypassed');
    }); // prevent error bubbling up;
    return idProm;
  }
  close(idProm?: IdPromise) {
    if (!idProm) return;
    idProm.then((id: Id) => {
      this.Comp.removeLoading(id);
    }, () => {});
  }
}
