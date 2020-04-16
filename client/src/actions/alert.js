import { SET_ALERT, REMOVE_ALERT } from './Types'
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (type, msg) => dispatch => {

    const id = uuidv4()

    dispatch({
        type: SET_ALERT,
        payload: {
            id,
            type,
            msg
        }
    })

    setTimeout(() => dispatch({
        type: REMOVE_ALERT,
        payload: id
    }), 3000)
}

export const removeAlert = (id) => dispatch => {
    dispatch({
        type: REMOVE_ALERT,
        payload: id
    })
}

