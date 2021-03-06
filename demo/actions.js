// @flow
import { GlobalLoading, Themes, type Indicator, type Active } from '../src';

let gLoading;
const calls: { [string]: Indicator } = {};

export type Action = { type: string, loading: Active };
export type Dispatch = Action => void;

export function stop(path: string) {
  gLoading.close(calls[path]);
  delete calls[path];
  return { type: path, loading: false };
}

export function load(
  path: string,
  timeout?: number = Infinity,
  msg?: string,
  alwaysGlobal?: boolean = false,
) {
  return function Load(dispatch: Dispatch) {
    if (calls[path]) return;
    calls[path] = gLoading.open(msg || `loading ${path} ...`);
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
  let _dispatch: Dispatch;
  function run() {
    progress += Math.random() * 0.2;
    if (progress > 1) {
      progress = 1;
    }
    _dispatch({ type: path, loading: calls[path], progress });
    if (!calls[path] || progress === 1) {
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
  return function Load(dispatch: Dispatch) {
    if (calls[path]) return;
    calls[path] = gLoading.open();
    start(dispatch);
  };
}

const creators = [() => new GlobalLoading(), () => new GlobalLoading(Themes.Circling, true, true)];
let ix = 0;

function changeGlobalTheme() {
  gLoading = creators[ix]();
  ix ^= 1; // eslint-disable-line no-bitwise
}

export { changeGlobalTheme };

changeGlobalTheme();
