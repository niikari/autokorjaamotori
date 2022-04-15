import { LOGIN, LOGOUT, REGISTER, WELCOME, UPDATE, UPDATE_ADD_PLACE } from "./userActions"

const userReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                user: null
            }
        case REGISTER:
            return {
                ...state,
                user: action.payload
            }
        case WELCOME:
            return {
                ...state,
                welcome: false
            }
        case UPDATE:
            return {
                state
            }
        case UPDATE_ADD_PLACE:
            return {
                ...state,
                
            }
        default:
            return {
                ...state,
                user: action.payload
            }
    }
}

export default userReducer