import { GET_TASKS, TASK_ERROR, ADD_TASK, DELETE_TASK, EDIT_TASK } from '../actions/Types'

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
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, payload]
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== payload)
            }
        case TASK_ERROR:
            return {
                ...state,
                error: payload
            }
        case EDIT_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if (task._id === payload._id) {
                        task = payload
                    }
                    return task
                })
            }
        default:
            return state
    }

}