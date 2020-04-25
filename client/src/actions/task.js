import { GET_TASKS, TASK_ERROR, ADD_TASK, DELETE_TASK, EDIT_TASK } from './Types'
import axios from 'axios'

export const loadTasks = (filterValues = {}) => async dispatch => {


    let route = '/api/tasks'

    const { completed, sortBy } = filterValues

    if (completed && sortBy) {

        route += `?completed=${completed}&sortBy=${sortBy}`

    } else {
        let query = completed || sortBy

        let key = query === completed ? "completed" : "sortBy"

        route += `?${key}=${query}`
    }

    console.log(route)
    try {

        const res = await axios.get(route)

        dispatch({
            type: GET_TASKS,
            payload: res.data
        })

    } catch (error) {

        dispatch({
            type: TASK_ERROR,
            payload: error.msg
        })
        console.log(error)
    }
}



export const addTask = (formData) => async dispatch => {

    try {

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/tasks', formData, config)

        dispatch({
            type: ADD_TASK,
            payload: res.data
        })



    } catch (error) {

        dispatch({
            type: TASK_ERROR,
            payload: error.msg
        })

        console.log(error)
    }
}

export const deleteTask = (id) => async dispatch => {

    try {

        await axios.delete(`/api/tasks/${id}`)

        dispatch({
            type: DELETE_TASK,
            payload: id
        })

    } catch (error) {

        dispatch({
            type: TASK_ERROR,
            error: error.msg
        })

        console.log(error)
    }
}

export const editTask = (formData, id) => async dispatch => {

    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.patch(`/api/tasks/${id}`, formData, config)

        dispatch({
            type: EDIT_TASK,
            payload: res.data
        })

    } catch (error) {

        dispatch({
            type: TASK_ERROR,
            error: error.msg
        })

        console.log(error)
    }
}


