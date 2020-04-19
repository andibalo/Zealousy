import { GET_TASKS, TASK_ERROR } from '../actions/Types'

const initialState = {
    task: null,
    tasks: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {

    const { payload, type } = action

    switch (type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: payload,
                loading: false
            }
        case TASK_ERROR:
            return {
                ...state,
                error: payload
            }
        default:
            return state
    }

}