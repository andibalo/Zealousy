import { SET_ALERT } from '../actions/Types'

const initialState = []

export default function (state = initialState, action) {

    const { payload, type } = action

    switch (type) {
        case SET_ALERT:
            return [...state, payload]
        default:
            return state
    }
}