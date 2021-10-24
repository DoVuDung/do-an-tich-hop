import React,{ createContext, useReducer, useEffect } from 'react'
import { AUTH_LOCAL_TOKEN_NAME } from '../constants/index'
import setAuthToken from '../untils/setAuthToken' 
import { authReducer } from '../reducer/authReducer'
import { getUser, signIn } from '../api/auth_api'

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
            const res = await getUser()
            if(res.success){
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user: res.data.user
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
            const res = await signIn(input)
            if(res.success){
                localStorage.setItem(
                    AUTH_LOCAL_TOKEN_NAME,
                    res.data.token,
                )
            }
            await loadUser()

            return res
        } catch (error) {

            return error.response.data.message
        }
    }
    const logout = async () => {
        localStorage.removeItem(AUTH_LOCAL_TOKEN_NAME)
        window.location.reload()
    }

    const data = {login, authState, logout}

    return (
        <UserContext.Provider
            value={data}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
