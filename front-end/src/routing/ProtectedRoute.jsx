import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { Redirect } from 'react-router-dom'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const{
        authState: { loading, isAuthenticated }
    } = useContext(UserContext)

    if(loading)
        return (
            <div>
                loading....
            </div>
        )
    if(isAuthenticated) return <Component {...rest}/>
    return <Redirect to='/signin'/>
}
