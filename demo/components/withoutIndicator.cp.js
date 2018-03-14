import React from 'react';
import { LocalLoading, type Indicator } from '../../src';

export default function Local(props: { active: Indicator, button: HTMLElement }) {
  return <LocalLoading active={props.active} button={props.button} container={false} />;
}
