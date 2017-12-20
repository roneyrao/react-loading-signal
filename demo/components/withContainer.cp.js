
import React, {Component as Comp} from 'react';
import PropTypes from 'prop-types';
import {LocalLoading} from 'FlexLoading';
 
export default class WithContainer extends Comp{
	render(){
		return (
			<div>
				<p>text text </p>
				<p>text text </p>
				<div ref={(div)=>{this.ctnr=div}}/>
				<p>text text </p>
				<p>text text </p>
				<LocalLoading {...this.props} container={this.ctnr} />
			</div>
		)
	}
}
WithContainer.propTypes={
	active:PropTypes.bool,
	button:PropTypes.node
}
