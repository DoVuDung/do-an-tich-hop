import React, { createContext, useState } from 'react'

export const CourseContext = createContext()

const CourseContextProvider = ({children}) => {
    const [courses, setCourses] = useState([])

    const data={
        courses, setCourses
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
