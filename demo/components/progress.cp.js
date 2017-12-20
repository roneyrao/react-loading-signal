
import React from 'react';
import PropTypes from 'prop-types';
import {LocalLoading, Themes} from 'FlexLoading';
 
export default function Progress(props){
	return (
		<LocalLoading {...props} theme={Themes.Progress}/>
	)
}
Progress.propTypes={
	active:PropTypes.bool,
	theme:PropTypes.func,
	message:PropTypes.object,
}
