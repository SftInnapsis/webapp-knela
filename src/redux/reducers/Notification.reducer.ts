import {
   NOTIFICATIONS
} from '@constants/action-type'

const initialState = {
   notifications: 0,
   // dataNotify:[]
}

export default function(state = initialState, action:any){
   switch(action.type){
       case NOTIFICATIONS:
           return {
               ...state,
               notifications: action.payload,
               // dataNotify:action.payload.datos
           }
       default: return state
   }
}
