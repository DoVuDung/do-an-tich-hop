import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { Redirect, Route } from 'react-router-dom'

const AuthRoute = ({component: Component, ...rest}) => {
    
    const {
        authState: { loading, isAuthenticated }
    } = useContext(UserContext)

    if(loading) return (
        <div>
            loading...
        </div>
    )

    return (
        <Route 
            {...rest}
            render={props => (
                !isAuthenticated ? (
                <Component {...props}/>
            ) : (
                <Redirect to='/'/>
            )
        )} />
    )
}

export default AuthRoute
