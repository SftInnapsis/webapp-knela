import {
    MESSAGE_CHAT
} from '@constants/action-type'

const initialState = {
    messageChats: []
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case MESSAGE_CHAT:
            return {
                ...state,
                messageChats: action.payload,
            }
        default: return state
    }
}
