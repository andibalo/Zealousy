import { AUTH_ERROR, REGISTER, LOGIN, LOAD_USER } from "./Types";
import axios from 'axios'


export const loadUser = () => async dispatch => {

    const token = localStorage.getItem('token')

    if (token) {
        axios.defaults.headers.common['auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['auth-token']
    }


    try {
        const res = await axios.get('/api/users/me')

        dispatch({
            type: LOAD_USER,
            payload: res.data
        })
    } catch (error) {

        console.log(error)
    }
}

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



        console.log(error)

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



        console.log(error)

        dispatch({
            type: AUTH_ERROR
        })
    }
}