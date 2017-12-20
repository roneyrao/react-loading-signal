
function Progressing(action){
	if(action.type=='progress'){
		let prg=action.loading;
		if(typeof(prg)!='number'){
			prg=parseFloat(prg);
			if(isNaN(prg))prg=1;
		}
		if(prg < 0){
			prg=0;
		}else if(prg > 1){
			prg=1;
		}
		return prg;
	}else{
		return action.loading;
	}
}


export default function Reducers(state={}, action){
	return {...state, [action.type]:Progressing(action)};
}
