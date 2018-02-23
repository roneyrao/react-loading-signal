import wrap from './wrapLoading';
import Local from '../components/local.cp';

export default wrap(Local, 'Local loading', 'when local loading is shown, global one is ommited');
