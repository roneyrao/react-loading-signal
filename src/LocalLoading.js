import React from 'react';
import {
	render,
	findDOMNode,
	unmountComponentAtNode as unmount
} from 'react-dom';
import styles from './styles';
//import styles from './styles/FlexLoading.css';
import PropTypes from 'prop-types';
import {
	Blobs
} from './themes';
import {
	LoadingEvent,
	EVENT_LOCAL_HADNDLED
} from './LoadingEvent';

/*
 * Local loading state is managed by caller;
 */
export default class LocalLoading extends React.Component {
	static propTypes = {
		active: PropTypes.bool.isRequired,
		masked: PropTypes.bool,
		message: PropTypes.any,
		button: PropTypes.instanceOf(Element), //if supplied, 'disabled' of property and class are set;
		// where loading is placed;
		container: PropTypes.oneOfType([PropTypes.instanceOf(Element), PropTypes.oneOf([false, undefined])]),
		theme:PropTypes.func
	}
	static defaultProps = {
		active: false,
		masked: false,
		message: '',
		theme: Blobs
	}
	createLoadingBox(container, masked) {
		this.box = document.createElement('div');
		//console.error('masked', masked);
		this.box.setAttribute('class', masked ? styles.localMasked : styles.local);
		if (!masked) {
			const styles = window.getComputedStyle?window.getComputedStyle(container):container.currentStyle;
			if (styles.position == 'static') {
				container.style.position = 'relative';
			}
		}
		container.appendChild(this.box);
	}
	renderLoading(Theme, message) {
		//console.log('Theme', Theme);
		render(<Theme message={message} />, this.box);
	}
	toggleDisplay(active, button) {
		//when button changed, restore previous button state;
		if(button != this.props.button && this.props.button && this.props.active){
			this.props.button.classList.remove('disabled');
			this.props.button.removeAttribute('disabled');
		}
		if (active) {
			if(this.box){
				this.box.style.visibility = 'visible';
				LoadingEvent.emit(EVENT_LOCAL_HADNDLED);//notify global loading to bypass this one;
			}
			if (button) {
				button.classList.add('disabled');
				button.setAttribute('disabled', 'disabled');
			}
		} else {
			if(this.box){
				this.box.style.visibility = 'hidden';
			}
			if (button) {
				button.classList.remove('disabled');
				button.removeAttribute('disabled');
			}
		}
	}
	componentWillReceiveProps({
		active,
		button,
		container,
		message,
		masked,
		theme
	}) {
		//initial container
		if (container !== this.props.container) {
			if (this.box) {
				this.destroy();
			}
			if (container === undefined) {
				container = findDOMNode(this).parentNode; //eslint-disable-line react/no-find-dom-node
			}
			if(container){
				this.createLoadingBox(container, masked);
			}
		}else{
			if(this.box&&masked!=this.props.masked){
				this.box.setAttribute('class', masked ? styles.localMasked : styles.local);
			}
		}

		//render box content
		if (this.box && (message != this.props.message || theme != this.props.theme)) {
			this.renderLoading(theme, message);
		}

		//show/hide box;
		if (active != this.props.active || button != this.props.button) {
			this.toggleDisplay(active, button);
		}
	}
	componentDidMount() {
		let {
			active,
			masked,
			button,
			container,
			message,
			theme
		} = this.props;
		//console.log('didMount props', this.props);
		//initial container
		if (container === undefined) {
			container = findDOMNode(this).parentNode; //eslint-disable-line react/no-find-dom-node
			//console.log('parent', container);
		}
		if (container) {
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
	destroy(){
		//clear
		unmount(this.box);
		if (this.box.parentNode) {
			this.box.parentNode.removeChild(this.box);
		}
	}
	//nothing to render; done manually into container;
	render() {
		return <i />; //necessary for findDOMNode;
	}
}
