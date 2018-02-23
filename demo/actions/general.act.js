// @flow
import { GlobalLoading } from '../../src';

const gLoading = new GlobalLoading();
const calls = {};

export function stop(path: string) {
  gLoading.close(calls[path]);
  delete calls[path];
  return { type: path, loading: false };
}
export function load(path: string, timeout: number = Infinity, msg: string) {
  return function Load(dispatch: Function) {
    if (calls[path]) return;
    dispatch({ type: path, loading: true });
    calls[path] = gLoading.open(msg);
    if (timeout !== Infinity) {
      window.setTimeout(() => {
        dispatch(stop(path));
      }, timeout * 1000);
    }
  };
}
