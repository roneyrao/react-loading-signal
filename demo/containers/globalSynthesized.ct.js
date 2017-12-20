import wrap from './wrapLoading.js';
const Dummy=()=>'';
export default wrap(Dummy, 'Global Loading', 'Global loading indicator is injected in network/ajax layer, when no local indicator intercepts, global indicator is shown'); 
