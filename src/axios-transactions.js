import axios from 'axios'

const instance = axios.create({
    baseURL : 'https://budget-manager-94fa5.firebaseio.com/'
})

export default instance