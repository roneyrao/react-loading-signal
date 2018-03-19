// @flow
import React from 'react';
import { LocalLoading, type LoadingProps } from '../../src';
import { Progress } from '../../src/themes';

export default function Progressing(props: LoadingProps & Progress.ProgressProps) {
  return <LocalLoading {...props} theme={Progress.default} />;
}
