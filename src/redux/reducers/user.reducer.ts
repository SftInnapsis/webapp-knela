import {
   ACTION_SET_LIST_USER,
} from '@constants/action-type';
import { userReducer } from '@toolbox/types/reducer.type';

const initialState: userReducer = {
   userList: [],
	isLoad: false
}

export default function (state=initialState, action: any) : userReducer {
	switch(action.type){
		case ACTION_SET_LIST_USER:
			return Object.assign({}, state, { userList : action.payload, isLoad: true })
		default:
			return state
	}
}
