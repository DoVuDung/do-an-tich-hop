import axios from 'axios'

export const postNewCourse = async (input) => {
    try {
        const res = await axios.post('http://localhost:5000/api/v1/courses', input)
        
        return res.data
    } catch (error) {
        throw error
    }
}