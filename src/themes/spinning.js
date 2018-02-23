import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles';

export default function LoadingSpinning({ message }) {
  return <div className={styles.spinning}>{message}</div>;
}
LoadingSpinning.propTypes = {
  message: PropTypes.node,
};
LoadingSpinning.defaultProps = {
  message: 'loading...',
};
