import { SET_ALERT, REMOVE_ALERT, FADE_OUT } from './Types'
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (type, msg, fadeIn = true) => dispatch => {

    const id = uuidv4()

    dispatch({
        type: SET_ALERT,
        payload: {
            id,
            type,
            msg,
            fadeIn
        }
    })

    setTimeout(() => {

        dispatch({
            type: FADE_OUT,
            payload: id
        })

    }, 3000)

    setTimeout(() => {

        dispatch({
            type: REMOVE_ALERT,
            payload: id
        })

    }, 3500)
}

export const removeAlert = (id) => dispatch => {
    dispatch({
        type: REMOVE_ALERT,
        payload: id
    })
}

