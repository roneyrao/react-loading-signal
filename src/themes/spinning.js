// @flow
import React, { type Node, type ChildrenArray } from 'react';
import styles from '../styles';

type Props = { message?: ChildrenArray<Node> };
export default function LoadingSpinning({ message }: Props) {
  return <div className={styles.spinning}>{message}</div>;
}
LoadingSpinning.defaultProps = {
  message: 'loading...',
};
