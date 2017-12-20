
import React from 'react';
import PropTypes from 'prop-types';
import {LocalLoading} from 'FlexLoading';
 
export default function Local(props){
	return (
		<LocalLoading {...props} container={false}/>
	)
}
Local.propTypes={
	active:PropTypes.bool,
}
