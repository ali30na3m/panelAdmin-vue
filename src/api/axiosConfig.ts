import axios from 'axios'

export const baseURL = 'http://localhost:8000/api/'

export const apiAgent = axios.create({ baseURL })
apiAgent.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiAgent.interceptors.response.use(
  (config) => config,
  (error) => {
    return Promise.reject(error)
  }
)
