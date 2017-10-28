
import React from 'react';
import PropTypes from 'prop-types';
import {LocalLoading} from 'FlexLoading';
 
export default function Panel1(props){
	return (
		<div className='panel'>
			<LocalLoading active={props.active} />
		</div>
	)
}
Panel1.propTypes={
	active:PropTypes.bool,
}
