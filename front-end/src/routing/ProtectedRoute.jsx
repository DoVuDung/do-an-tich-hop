import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const{
        authState: { loading, isAuthenticated }
    } = useContext(UserContext)

    if(loading)
        return (
            <div>
                loading....
            </div>
        )
    return (
        <Route 
            {...rest}
            render={props => (
                isAuthenticated ? (
                <Component {...props} {...rest}/>
            ) : (
                <Redirect to='/signin'/>
            )
        )} />
    )
}

export default ProtectedRoute
