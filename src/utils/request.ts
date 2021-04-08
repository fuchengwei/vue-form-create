import axios from 'axios'

const request = axios.create({
  withCredentials: false
})

export default request
