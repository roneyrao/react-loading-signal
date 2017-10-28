import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles';
export default function LoadingSpinning({message='loading...'}){
	return (
		<div className={styles.spinning}>
			{message}
		</div>
	);
}
LoadingSpinning.propTypes={
	message:PropTypes.node
}
