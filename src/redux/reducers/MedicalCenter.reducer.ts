import {
    MEDICAL_CENTER
} from '@constants/action-type'

const initialState = {
    id_medical_center: null
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case MEDICAL_CENTER:
            return {
                ...state,
                id_medical_center: action.payload,
            }
        default: return state
    }
}
