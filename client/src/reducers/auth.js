import { AUTH_ERROR, LOGIN, REGISTER, LOAD_USER, LOG_OUT, DELETE_ACCOUNT, UPLOAD_IMAGE } from '../actions/Types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
}


export default function (state = initialState, action) {

    const { payload, type } = action

    switch (type) {
        case UPLOAD_IMAGE:
        case LOAD_USER:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case LOGIN:
        case REGISTER:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case LOG_OUT:
        case AUTH_ERROR:
        case DELETE_ACCOUNT:
            localStorage.removeItem('token')
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