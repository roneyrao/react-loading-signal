// @flow
import * as React from 'react';
import { render, findDOMNode, unmountComponentAtNode as unmount } from 'react-dom';
import styles from './styles';
import { Blobs } from './themes';
// import { LoadingEvent, EVENT_LOCAL_HADNDLED } from './LoadingEvent';
import type { Indicator } from './GlobalLoading';

type Props = {
  active: ?Indicator,
  masked: boolean,
  message: React.Node,
  button: HTMLElement, // if supplied, 'disabled' of property and class are set;
  container: ?HTMLElement | false, // where loading is placed;
  theme: React.ComponentType<*>,
};
/*
 * Local loading state is managed by caller;
 */
export default class LocalLoading extends React.PureComponent<Props> {
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
  createLoadingBox(container: HTMLElement, masked: boolean) {
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
  renderLoading(props) {
    // console.log('Theme', Theme);
    const Theme = props.theme || Blobs;
    render(<Theme {...props} active={!!props.active} />, this.box);
  }
  display(active: Props.active, button: HTMLElement) {
    if (active) {
      if (this.box) {
        this.box.style.visibility = 'visible';
        if (active !== true) {
          active.canceled = true;
        }
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
  componentWillReceiveProps(nextProps: Props) {
    // initial container
    const {
      active, button, message, masked, theme,
    } = nextProps;
    let { container } = nextProps;
    let toRenderLoading;
    if (container !== this.props.container) {
      if (this.box) {
        this.destroy();
      }
      if (container == undefined) { // eslint-disable-line eqeqeq
        container = this.getContainer();
      }
      if (container instanceof HTMLElement) {
        this.createLoadingBox(container, masked);
        toRenderLoading = true;
      }
    } else if (this.box && masked !== this.props.masked) {
      this.box.setAttribute('class', masked ? styles.localMasked : styles.local);
    }

    // render box content
    if (
      toRenderLoading ||
      (this.box &&
        (active !== this.props.active ||
          message !== this.props.message ||
          theme !== this.props.theme))
    ) {
      this.renderLoading(nextProps);
      if (active) {
        this.display(active);
      }
    }

    // show/hide box;
    if (active !== this.props.active || button !== this.props.button) {
      // when button changed, restore previous button state;
      if (button !== this.props.button && this.props.button && this.props.active) {
        this.props.button.classList.remove('disabled');
        this.props.button.removeAttribute('disabled');
      }
      this.display(active, button);
    }
  }
  componentDidMount() {
    const { active, masked, button }: Props = this.props;
    let { container } = this.props;
    // console.log('didMount props', this.props);
    // initial container
    if (container == undefined) { // eslint-disable-line eqeqeq
      container = this.getContainer();
    }
    if (container instanceof HTMLElement) {
      this.createLoadingBox(container, masked);
      this.renderLoading(this.props);
    }

    this.display(active, button);
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
    this.box = null;
  }
  // nothing to render; done manually into container;
  render() {
    return <i />; // necessary for findDOMNode;
  }
}
