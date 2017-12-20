
export function load(){
	let progress, timer, _dispatch;
	function run(){
		progress+=Math.random()*0.2;
		_dispatch({type:'progressing', progress});
		if(progress>1){
			window.clearInterval(timer);
		}
	}
	function start(dispatch){
		_dispatch=dispatch;
		progress=0;
		timer=window.setInterval(run, 500);
	}
	return function(dispatch){
		start(dispatch);
	}
}
