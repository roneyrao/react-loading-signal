const header =`
import { GlobalLoading, LocalLoading, type Indicator, type Active, type LoadingProps } from './e2e/published/node_modules/react-loading-signal/es/';
`
const tests = [
`
// opaque forbids
const id: Indicator = Promise.resolve('aaa');
id.canceled = true;
`,

`
// false type
const active: Active = 'aaaa';
`,

`
// active is required
const props0: LoadingProps = {}
`,

`
// container doesn't accept true
const props1: LoadingProps = {
  active,
  container: true,
}
`,

`
// getElementById returns null which is not acceptable
const props2: LoadingProps = {
  active,
  container: document.getElementById('aa'),
}
`
];

module.exports = tests.map(function (t) {
  return header + t;
});
