import React from 'react'
import { Route } from 'react-router-dom'
// import {AdminRoute} from './adminRouting'
// import commonLayout from '../components/layout/master_page/CommonLayout'
import SignIn from '../components/module/signin/ui/SignIn'
import SignUp from '../components/module/signup/ui/SignUp'
import Home from '../components/layout/home/ui/Home'

const Routes = () => {
    return (
        <>
            <Route path='/' component={Home} exact/>
            <Route path='/signin' component={SignIn} exact/>
            <Route path='/signup' component={SignUp} exact/>
            
            {/* <AdminRoute /> */}
        </>
    )
}

export default Routes
