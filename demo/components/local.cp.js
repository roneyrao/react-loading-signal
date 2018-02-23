import React from 'react';
import { LocalLoading } from '../../src';

export default function Local(props) {
  return <LocalLoading active={props.active} message="Custom Message" />;
}
