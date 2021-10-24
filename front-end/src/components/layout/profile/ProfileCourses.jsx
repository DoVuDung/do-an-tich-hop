import React from 'react'
import img from '../../../assets/images/trendingTopic.png'
import { Link } from 'react-router-dom'
export const ProfileCourses = () => {
    return (
        <div>
            <ProfileCoursesItem />
        </div>
    )
}
const ProfileCoursesItem = () => {
    return (
        <div className='profileCourse'>
            <div className='profileCourse-img'>
                <Link to='/'>
                    <img src={img} alt="" />
                </Link>
            </div>
            <div className='profileCourse-info'>
                <h4><Link to='/course/1'>
                Web development
                </Link></h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, veniam aspernatur dolorem voluptates vel tenetur?</p>
            </div>
        </div>
    )
}