import React from 'react'
import { Route } from 'react-router-dom'
import SignIn from '../components/module/signin/SignIn'
import SignUp from '../components/module/signup/SignUp'
import CourseCreate from '../components/layout/course/CourseCreate'
import Home from '../components/layout/home/Home'
import ProtectedRoute from './ProtectedRoute'
import AuthRoute from './AuthRoute'


const Routes = () => {
    return (
        <>
            <Route path='/teacher/course/create' component={CourseCreate} exact/>
            <ProtectedRoute path='/' component={Home} exact/>
            <AuthRoute path='/signin' component={SignIn} exact/>
            <AuthRoute path='/signup' component={SignUp} exact/>
        </>
    )
}

export default Routes
