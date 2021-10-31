import axios from 'axios'

export const getUserProfile = async (param) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/v1/users/${param}/profile`)

        return res.data
    } catch (error) {
        throw error
    }
}