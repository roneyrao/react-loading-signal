import wrap from './wrapLoading.js';
import WithContainer from '../components/withContainer.cp';
export default wrap(WithContainer, "Local loading indicator with container specified", 'loading indicator showed in the specified container instead of parentNode by default'); 
