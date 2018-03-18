// @flow
import { type Indicator } from '../src';
import { type Action } from './actions';

type State = {
  [string]: Indicator | { loading: Indicator, progress: number }
};

export default function Reducers(state: State = {}, action: Action): State {
  const { type } = action;
  let loading;
  if (action.progress) {
    delete action.type;
  } else {
    ({ loading } = action);
  }
  return { ...state, [type]: loading === undefined ? action : loading };
}
