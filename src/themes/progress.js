// @flow
import React from 'react';
import styles from '../styles';

type Caption = (number) => string;
type Props = {
  message?: {
    progress: number,
    caption: Caption,
  },
};


function caption(progress) {
  return `current progress: ${(progress * 100).toPrecision(4)}%`;
}

export default function LoadingProgress({ message }: Props) {
  return (
    <div className={styles.progress}>
      <div>{(message.caption || caption)(message.progress)}</div>
      <div className={styles.progressBar}>
        <div style={{ width: `${message.progress * 100}%` }} />
      </div>
    </div>
  );
}
LoadingProgress.defaultProps = {
  message: {
    progress: 0,
  },
};
