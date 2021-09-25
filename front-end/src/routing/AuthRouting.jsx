import React, {useContext} from 'react'
import { UserContext } from '../context/userContext'
import {Route , Redirect} from 'react-router-dom'
import Home from '../components/layout/home/Home'

const AuthRouting = () => {

    const {authState: {isAuthenticated}} = useContext(UserContext)

    return (
        <Route
            render={props => {
                if(!isAuthenticated) 
                    return <Redirect to='/signin'/>
                else return (<Home />)
                    
            }}
        />
    )
}

export default AuthRouting
