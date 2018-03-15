// @flow
import React from 'react';
import styles from '../styles';

export default function LoadingSpinning({ message }: { message?: React.ChildrenArray<mixed> }) {
  return <div className={styles.circling}>{message}</div>;
}
LoadingSpinning.defaultProps = {
  message: 'loading...',
};
