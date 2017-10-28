
export function load(ix, timeout=Infinity){
	const key='load'+ix;
	return function(dispatch){
		dispatch({type:key, loading:true});
		if(timeout!=Infinity){
			window.setTimeout(function(){
				dispatch({type:key, loading:false});
			}, timeout*1000);
		}
	}
}
export function stop(ix){
	return function(dispatch){
		dispatch({type:'load'+ix, loading:false});
	}
}
