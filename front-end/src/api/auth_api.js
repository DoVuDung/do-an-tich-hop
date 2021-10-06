import axios from 'axios'

export const getUser = async () => {
    try {
        const res = await axios.get(`http://localhost:5000/api/v1/auth/`)
        
        return res.data
    } catch (error) {
        throw error
    }
}
export const signUp = async (input) => {
    try {
        const res = await axios.post('http://localhost:5000/api/v1/auth/signup', input)

        return res.data
    } catch (error) {

        return error.response.data.message
    }
}
export const signIn = async (input) => {
    try {
        const res = await axios.post('http://localhost:5000/api/v1/auth/login', input)
        
        return res.data
    } catch (error) {
        throw error
    }
}