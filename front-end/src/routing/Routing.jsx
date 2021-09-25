import React from 'react'
import { Route } from 'react-router-dom'
import SignIn from '../components/module/signin/SignIn'
import SignUp from '../components/module/signup/SignUp'
import Home from '../components/layout/home/Home'
import ProtectedRoute from './ProtectedRoute'


const Routes = () => {
    return (
        <>
            <Route path='/signin' component={SignIn} exact/>
            <Route path='/signup' component={SignUp} exact/>
            <ProtectedRoute path='/' component={Home} exact/>
        </>
    )
}

export default Routes
