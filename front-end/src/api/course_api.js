import axios from 'axios'

export const postNewCourse = async (input) => {
    try {
        const res = await axios.post('http://localhost:5000/api/v1/courses', input)
        
        return res.data
    } catch (error) {
        throw error
    }
}
export const getAllCourses = async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/v1/courses/all')

        return res.data
    } catch (error) {
        throw error
    }
}
export const getCourseIdOrSlug = async (param) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/v1/courses/${param}`)

        return res.data
    } catch (error) {
        throw error
    }
}
export const getUserTeachingCourse = async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/v1/users/teaching-courses')

        return res.data
    } catch (error) {
        throw error
    }
}
export const getCoursePagination = async (page) => {
    console.log('page', page)
    try {
        const res = await axios.get(`http://localhost:5000/api/v1/courses/all?page=${page}&count=12`)

        return res.data
    } catch (error) {
        throw error
    }
}