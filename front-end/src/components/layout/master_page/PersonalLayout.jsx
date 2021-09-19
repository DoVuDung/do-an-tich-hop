import React from 'react'
import Header from '../../module/header/ui/header'
import Footer from '../../module/footer/ui/Footer'

const PersonalLayout = ({children}) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default PersonalLayout
