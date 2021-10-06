import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { Redirect, Route } from 'react-router-dom'
import SignUp from '../components/module/signup/SignUp';
import SignIn from '../components/module/signin/SignIn'
const AuthRoute = ({authRoute}) => {
    
    const {
        authState: { loading, isAuthenticated }
    } = useContext(UserContext)

    if(loading) return (
        <div>
            loading...
        </div>
    )
    else if (isAuthenticated) return <Redirect to='/'/>
    return (
        <>
            {authRoute === 'signin' && <SignIn />}
            {authRoute === 'signup' && <SignUp />}
        </>
    )
}

export default AuthRoute
