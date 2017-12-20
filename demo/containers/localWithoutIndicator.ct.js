import wrap from './wrapLoading.js';
import WithoutIndicator from '../components/withoutIndicator.cp';
export default wrap(WithoutIndicator, "Local loading without indicator", 'when local loading with container specified to `false`, no indicator will show locally, then the global indicator is not intercepted, button is still disabled.'); 
