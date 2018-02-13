// requestAnimationFrame for React16
import 'raf/polyfill';
import 'babel-polyfill';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// make sure every test has assertion;
beforeEach(() => expect.hasAssertions());
