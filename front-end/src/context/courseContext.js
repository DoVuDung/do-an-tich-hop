import React, { createContext, useState } from 'react'

export const CourseContext = createContext()
const CourseContextProvider = ({children}) => {
    const [courses, setCourses] = useState([])
    const [userTeachingCourses, setUserTeachingCourses] = useState()
    const [loading, setLoading] = useState()

    const data={
        courses, setCourses,
        userTeachingCourses,
        setUserTeachingCourses,
        loading, setLoading
    }

    return (
        <CourseContext.Provider
            value={data}
        >
            {children}
        </CourseContext.Provider>
    )
}

export default CourseContextProvider
