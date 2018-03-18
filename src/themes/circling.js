// @flow
import React, { type Node, type ChildrenArray } from 'react';
import styles from '../styles';

type Props = { message?: ChildrenArray<Node> };
export default function LoadingCircling({ message }: Props) {
  return <div className={styles.circling}>{message}</div>;
}
LoadingCircling.defaultProps = {
  message: 'loading...',
};
