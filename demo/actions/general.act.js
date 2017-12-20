import {GlobalLoading, Themes} from 'FlexLoading';

const gLoading=new GlobalLoading(Themes.Spinning, true, true);
const calls={};

export function load(ix, timeout=Infinity, msg){
	const key='load'+ix;
	return function(dispatch){
		dispatch({type:key, loading:true});
		calls[ix]=gLoading.open(msg);
		if(timeout!=Infinity){
			window.setTimeout(function(){
				dispatch({type:key, loading:false});
			}, timeout*1000);
		}
	}
}
export function stop(ix){
	gLoading.close(calls[ix]);
	return {type:'load'+ix, loading:false};
}
