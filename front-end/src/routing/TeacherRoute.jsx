import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { Redirect } from 'react-router-dom'

export const TeacherRoute = ({ component: Component, ...rest }) => {

    const{
        authState: { loading, isAuthenticated, user }
    } = useContext(UserContext)

    if(loading)
        return (
            <div>
                loading....
            </div>
        )
    if(isAuthenticated && user.role.id === 3) return <Component {...rest}/>
    return <Redirect to='/home'/>
}