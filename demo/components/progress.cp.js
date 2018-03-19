// @flow
import React from 'react';
import { LocalLoading, type Active } from '../../src';
import { Progress } from '../../src/themes';

type Props = {
  active: Active,
} & Progress.ProgressProps;

export default function Progressing(props: Props) {
  return <LocalLoading {...props} theme={Progress.default} />;
}
