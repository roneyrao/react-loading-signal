import React from 'react';
import { LocalLoading, Themes } from '../../src';

export default function Progress(props) {
  return <LocalLoading {...props} theme={Themes.Progress} />;
}
