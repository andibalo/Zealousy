import { GET_TASKS, TASK_ERROR, ADD_TASK } from './Types'
import axios from 'axios'

export const loadTasks = () => async dispatch => {

    try {

        const res = await axios.get('/api/tasks')

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


