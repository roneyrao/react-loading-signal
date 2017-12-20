
import React from 'react';
import PropTypes from 'prop-types';
import {LocalLoading} from 'FlexLoading';
 
export default function Local(props){
	return (
		<LocalLoading active={props.active} message='Custom Message'/>
	)
}
Local.propTypes={
	active:PropTypes.bool,
}
