// @flow
import * as React from 'react';
import css from '../main.css';

type Props = {
  title: string,
  desc?: string,
  children: React.ChildrenArray<React.Element<*>>,
}

export default function Block({ title, desc, children }: Props) {
  return (
    <div className={css.block}>
      <h3>{title}</h3>
      <h5>{desc}</h5>
      {children}
    </div>
  );
}
Block.defaultProps = {
  desc: '',
};
