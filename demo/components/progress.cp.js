// @flow
import React from 'react';
import { LocalLoading, type Active } from '../../src';
import { Progress, type ProgressProps } from '../../src/themes';

type Props = {
  active: Active,
} & ProgressProps;

export default function Progressing(props: Props) {
  return <LocalLoading {...props} theme={Progress} />;
}
