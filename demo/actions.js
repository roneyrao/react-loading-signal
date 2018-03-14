// @flow
import { GlobalLoading, type Indicator } from '../src';

const gLoading = new GlobalLoading();
const calls: { [string]: Indicator } = {};

export function stop(path: string) {
  gLoading.close(calls[path]);
  delete calls[path];
  return { type: path, loading: null };
}
type Action = { type: string, loading: Indicator };
type Dispatch = Action => any;

export function load(
  path: string,
  timeout?: number = Infinity,
  msg?: string,
  alwaysGlobal?: boolean = false,
) {
  return function Load(dispatch: Dispatch) {
    if (calls[path]) return;
    calls[path] = gLoading.open(msg || path);
    dispatch({ type: path, loading: alwaysGlobal || calls[path] });
    if (timeout !== Infinity) {
      window.setTimeout(() => {
        dispatch(stop(path));
      }, timeout * 1000);
    }
  };
}
export function loadProgress(path: string) {
  let progress;
  let _dispatch;
  function run() {
    progress += Math.random() * 0.2;
    if (progress > 1) {
      progress = 1;
    }
    _dispatch({ type: path, loading: calls[path], progress });
    if (progress === 1) {
      _dispatch(stop(path));
    } else {
      setTimeout(run, 500);
    }
  }
  function start(dispatch) {
    _dispatch = dispatch;
    progress = 0;
    run();
  }
  return function Load(dispatch) {
    if (calls[path]) return;
    calls[path] = gLoading.open();
    start(dispatch);
  };
}
