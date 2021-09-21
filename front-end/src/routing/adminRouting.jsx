import React from "react"
import { Route, Redirect } from "react-router-dom"

export const AdminRoute = () => {
    if(1 > 2)
    return (
        <>
            <Route
                path="/admin"
                exact
                render={({ match: url }) => (
                    <>
                        <Route path='/admin/dashboard' />
                        <Route path="/users" />
                        <Route path="/courses" />
                        <Route path="/setting" />
                    </>
                )}
            />
        </>
    )
    else 
        <Redirect push to='/' />
}