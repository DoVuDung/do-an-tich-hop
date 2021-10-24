import React from 'react'
import ProtectedHeader from '../../module/header/protectedHeader'
import Footer from '../../module/footer/Footer'

const PrivateMaterPage = ({children}) => {
    return (
        <>
            <ProtectedHeader />
                {children}
            <Footer />
        </>
    )
}

export default PrivateMaterPage
