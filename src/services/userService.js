import axios from 'axios'
const baseUrl = '/api/users'


const signup = newUser => {
    return axios.post(baseUrl, newUser).then(response => response.data)
} 

export default signup