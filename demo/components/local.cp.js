import React from 'react';
import { LocalLoading, type Indicator } from '../../src';

export default function Local(props: { active: Indicator }) {
  return <LocalLoading active={props.active} />;
}
