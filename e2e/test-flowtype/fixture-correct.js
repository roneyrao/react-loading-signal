import { GlobalLoading, LocalLoading, type Indicator, type Active, type LoadingProps } from './e2e/published/node_modules/react-loading-signal/es/';

const gGlobal = new GlobalLoading();
const id: Indicator = gGlobal.open();
gGlobal.close(id);

let active: Active = id;
active = true;

const props0: LoadingProps = {
  active,
}

const props1: LoadingProps = {
  active,
  container: false,
}

function Comp() {}

const props2: LoadingProps = {
  active,
  masked: true,
  message: 'afaffa',
  button: new HTMLElement(),
  container: new HTMLElement(),
  theme: Comp,
}
