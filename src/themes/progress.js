// @flow
import React from 'react';
import styles from '../styles';

export type Caption = (number) => string;
export type ProgressProps = {
  message: number,
  caption: Caption,
};


function defaultCaption(progress) {
  return `progress: ${(progress * 100).toPrecision(4)}%`;
}

export default function LoadingProgress({ message, caption }: ProgressProps) {
  return (
    <div className={styles.progress}>
      <div>{(caption || defaultCaption)(message)}</div>
      <div className={styles.progressBar}>
        <div style={{ width: `${message * 100}%` }} />
      </div>
    </div>
  );
}
