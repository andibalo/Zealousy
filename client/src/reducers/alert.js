import { SET_ALERT, REMOVE_ALERT, FADE_OUT } from '../actions/Types'


const initialState = []

export default function (state = initialState, action) {

    const { payload, type } = action

    switch (type) {
        case SET_ALERT:
            return [...state, payload]
        case FADE_OUT:
            return state.map(alert => {
                if (alert.id === payload) {
                    alert.fadeIn = false
                }

                return alert
            })
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload)
        default:
            return state
    }
}