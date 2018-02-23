// @flow
import * as React from 'react';
import { render, findDOMNode, unmountComponentAtNode as unmount } from 'react-dom';
import styles from './styles';
import { Blobs } from './themes';
import { LoadingEvent, EVENT_LOCAL_HADNDLED } from './LoadingEvent';

type Props = {
  active: bool,
  masked: bool,
  message: React.Node,
  button: HTMLElement, // if supplied, 'disabled' of property and class are set;
  // where loading is placed;
  container: HTMLElement | false | typeof undefined,
  theme: Function,
};
/*
 * Local loading state is managed by caller;
 */
export default class LocalLoading extends React.Component<Props> {
  static defaultProps = {
    masked: false,
    message: undefined,
    button: null,
    container: undefined,
    theme: Blobs,
  };
  box: HTMLElement;
  getContainer(): HTMLElement {
    // eslint-disable-next-line react/no-find-dom-node
    const dom: null | Element | Text = findDOMNode(this);
    if (dom instanceof HTMLElement) {
      const parent: ?Node = dom.parentNode;
      if (parent instanceof HTMLElement) {
        return parent;
      }
    }
    throw new Error('Local loading DOM is inaccessible');
  }
  createLoadingBox(container: HTMLElement, masked: bool) {
    this.box = document.createElement('div');
    // console.error('masked', masked);
    this.box.setAttribute('class', masked ? styles.localMasked : styles.local);
    if (!masked) {
      const computedStyles = window.getComputedStyle
        ? window.getComputedStyle(container)
        : (container: any).currentStyle;
      if (computedStyles.position === 'static') {
        container.style.position = 'relative';
      }
    }
    container.appendChild(this.box);
  }
  renderLoading(Theme: React.ComponentType<{}>, message: React.Node) {
    // console.log('Theme', Theme);
    Theme = Theme || Blobs;
    render(<Theme message={message} />, this.box);
  }
  toggleDisplay(active: bool, button: HTMLElement) {
    // when button changed, restore previous button state;
    if (button !== this.props.button && this.props.button && this.props.active) {
      this.props.button.classList.remove('disabled');
      this.props.button.removeAttribute('disabled');
    }
    if (active) {
      if (this.box) {
        this.box.style.visibility = 'visible';
        LoadingEvent.emit(EVENT_LOCAL_HADNDLED); // notify global loading to bypass this one;
      }
      if (button) {
        button.classList.add('disabled');
        button.setAttribute('disabled', 'disabled');
      }
    } else {
      if (this.box) {
        this.box.style.visibility = 'hidden';
      }
      if (button) {
        button.classList.remove('disabled');
        button.removeAttribute('disabled');
      }
    }
  }
  componentWillReceiveProps({
    active, button, container, message, masked, theme,
  }: Props) {
    // initial container
    if (container !== this.props.container) {
      if (this.box) {
        this.destroy();
      }
      if (container === undefined) {
        container = this.getContainer();
      }
      if (container instanceof HTMLElement) {
        this.createLoadingBox(container, masked);
      }
    } else if (this.box && masked !== this.props.masked) {
      this.box.setAttribute('class', masked ? styles.localMasked : styles.local);
    }

    // render box content
    if (this.box && (message !== this.props.message || theme !== this.props.theme)) {
      this.renderLoading(theme, message);
    }

    // show/hide box;
    if (active !== this.props.active || button !== this.props.button) {
      this.toggleDisplay(active, button);
    }
  }
  componentDidMount() {
    const {
      active, masked, button, message, theme,
    } = this.props;
    let container: HTMLElement | false | typeof undefined;
    ({ container } = this.props);
    // console.log('didMount props', this.props);
    // initial container
    if (container === undefined) {
      container = this.getContainer();
    }
    if (container instanceof HTMLElement) {
      this.createLoadingBox(container, masked);
      this.renderLoading(theme, message);
    }

    this.toggleDisplay(active, button);
  }
  componentWillUnmount() {
    if (this.box) {
      this.destroy();
    }
  }
  destroy() {
    // clear
    unmount(this.box);
    if (this.box.parentNode) {
      this.box.parentNode.removeChild(this.box);
    }
  }
  // nothing to render; done manually into container;
  render() {
    return <i />; // necessary for findDOMNode;
  }
}
