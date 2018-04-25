import { GET_APP } from '../actions/index';

export default function(state = null, action) {
	switch(action.type){
		case GET_APP:
			return ['Hello', 'World'];
		default:
			return state;
	}
}

