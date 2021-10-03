import React from 'react'
import { Route } from 'react-router-dom'
import SignIn from '../components/module/signin/SignIn'
import SignUp from '../components/module/signup/SignUp'
import Home from '../components/layout/home/Home'
import ProtectedRoute from './ProtectedRoute'
import AuthRoute from './AuthRoute'


const Routes = () => {
    return (
        <>
            <ProtectedRoute path='/' component={Home} exact/>
            <AuthRoute path='/signin' component={SignIn} exact/>
            <AuthRoute path='/signup' component={SignUp} exact/>
        </>
    )
}

export default Routes
