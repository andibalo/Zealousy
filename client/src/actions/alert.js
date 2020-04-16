import { SET_ALERT } from './Types'
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (type, msg) => dispatch => {

    dispatch({
        type: SET_ALERT,
        payload: {
            id: uuidv4(),
            type,
            msg
        }
    })
}

