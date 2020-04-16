import { AUTH_ERROR, LOGIN, REGISTER } from '../actions/Types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
}


export default function (state = initialState, action) {

    const { payload, type } = action

    switch (type) {
        case REGISTER:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case AUTH_ERROR:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        default:
            return state
    }

}