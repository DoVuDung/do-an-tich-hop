import axios from 'axios'

export const getCourseCategories = async (input) => {
    try {
        const res = await axios.post('http://localhost:5000/api/v1/course-categories/:categorySlugOrId/topics')
        
        return res.data
    } catch (error) {
        throw error
    }
}