import { AUTH_ERROR, REGISTER, LOGIN } from "./Types";
import axios from 'axios'

export const register = (formData) => async dispatch => {

    try {
        console.log(formData)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }


        const res = await axios.post('/api/users', formData, config)

        dispatch({
            type: REGISTER,
            payload: res.data
        })


    } catch (error) {

        const errorMsg = error.response.data

        console.log(errorMsg, error)

        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const login = (formData) => async dispatch => {

    try {
        console.log(formData)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }


        const res = await axios.post('/api/users/login', formData, config)

        dispatch({
            type: LOGIN,
            payload: res.data
        })


    } catch (error) {

        const errorMsg = error.response.data

        console.log(errorMsg, error)

        dispatch({
            type: AUTH_ERROR
        })
    }
}