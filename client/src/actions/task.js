import {GET_TASKS, TASK_ERROR} from './Types'
import axios from 'axios'

export const loadTasks = () => async dispatch => {

    try {
        
        const res = await axios.get('/api/tasks')

        dispatch({
            type:GET_TASKS,
            payload: res.data
        })

    } catch (error) {
        
        console.log(error)
    }
}