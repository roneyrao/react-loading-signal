import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles';

export default function LoadingProgress({ message }) {
  return (
    <div className={styles.progress}>
      <div>{message.caption(message.progress)}</div>
      <div className={styles.progressBar}>
        <div styles={{ width: `${message.progress * 100}%` }} />
      </div>
    </div>
  );
}
LoadingProgress.propTypes = {
  message: PropTypes.shape({
    progress: PropTypes.number,
    caption: PropTypes.func,
  }),
};
LoadingProgress.defaultProps = {
  message: {
    progress: 0,
    caption(progress) {
      return `current progress: ${progress}`;
    },
  },
};
