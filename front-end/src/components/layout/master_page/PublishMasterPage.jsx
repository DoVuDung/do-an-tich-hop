import React from 'react'
import Header from '../../module/header/header'
import Footer from '../../module/footer/Footer'

const PublishMasterPage = ({children}) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default PublishMasterPage