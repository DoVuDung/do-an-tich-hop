import axios from 'axios'

export const postNewChapter = async (input) => {
    try {
        const res = await axios.post('http://localhost:5000/api/v1/chapters', input)
        
        return res.data
    } catch (error) {
        throw error
    }
}