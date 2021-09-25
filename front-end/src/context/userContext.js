import React,{ createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { AUTH_LOCAL_TOKEN_NAME } from '../constants/index'
import setAuthToken from '../untils/setAuthToken' 
import { authReducer } from '../reducer/authReducer'


export const UserContext = createContext()

const UserContextProvider = ({children}) => {

    const [authState, dispatch] = useReducer(authReducer, {
        loading: true,
        isAuthenticated: false,
        user: null,
    })

    const loadUser = async () => {
        if(localStorage[AUTH_LOCAL_TOKEN_NAME]) {
            setAuthToken(localStorage[AUTH_LOCAL_TOKEN_NAME])
        }
        try {
            const res = await axios.get(`http://localhost:5000/api/v1/auth/`)
            if(res.data.success){
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user: res.data.data.user
                    }
                })
            }
        } catch (error) {
            localStorage.removeItem(AUTH_LOCAL_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: "SET_AUTH",
                payload: { isAuthenticated: false, user: null },
            })
        }
    }

    useEffect(() => {
        loadUser()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const login = async (input) => {
        try {
            const res = await axios.post('http://localhost:5000/api/v1/auth/login', input) 
            if(res.data.success){
                localStorage.setItem(
                    AUTH_LOCAL_TOKEN_NAME,
                    res.data.data.token,
                )
            }
            await loadUser()

            return res.data
        } catch (error) {

            return error.response.data.message
        }
    }

    const data = {login, authState}

    return (
        <UserContext.Provider
            value={data}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
