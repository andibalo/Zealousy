import { AUTH_ERROR, REGISTER, LOGIN, LOAD_USER, LOG_OUT, DELETE_ACCOUNT, UPLOAD_IMAGE } from "./Types";
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

export const logout = () => async dispatch => {

    try {
        await axios.get('api/users/logout')

        dispatch({
            type: LOG_OUT
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }

}



export const uploadImage = (file) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    const formData = new FormData()

    formData.append('avatar', file);

    try {

        const res = await axios.post('api/users/me/avatar', formData, config)

        dispatch({
            type: UPLOAD_IMAGE,
            payload: res.data
        })

        dispatch(loadUser())

    } catch (error) {

        console.log(error)
    }
}

export const deleteAccount = () => async dispatch => {

    try {

        await axios.delete('/api/users/me')

        dispatch({
            type: DELETE_ACCOUNT
        })

    } catch (error) {

        console.log(error)

        dispatch({
            type: AUTH_ERROR
        })
    }
}
