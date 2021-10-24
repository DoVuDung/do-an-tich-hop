import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { UserContext } from '../../../context/userContext'
const menuUserOption = [
    {
        title: 'Profile',
        path: '/profile/01'
    },
    {
        title: 'Course',
        path: '/user/course'
    },
    {
        title: 'LiveStreams',
        path: '/user/livestreams'
    },
    {
        title: 'Payment',
        path: '/user/payment'
    },
    {
        title: 'Insights',
        path: '/user/insights'
    },
    {
        title: 'Draft',
        path: '/user/draft'
    }
]

export const UserOption = () => {
    const { logout } = useContext(UserContext)
    return (
        <div className='userOptions'>
            {
                menuUserOption.map((item, index) => (
                    <div className='userOption' key={index}>
                        <Link to={item.path}>{item.title}</Link>
                    </div>
                ))
            }
             <div className='userOption' key='logout'
                onClick={() => {
                    logout()
                }}
             >
                Logout
            </div>
        </div>
    )
}