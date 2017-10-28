export default function Reducers(state={}, action){
	return {...state, [action.type]:action.loading}
}
