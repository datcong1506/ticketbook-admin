import type { AxiosInstance } from 'axios'
import axios from 'axios'

const BASE_URL = import.meta.env.BASE_URL

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

apiClient.interceptors.request.use(
  (config) => {
    // TODO: You can add a token here if required
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  response => response,
  (error) => {
    // TODO: Handle errors here, for example logging out the user if the token is expired
    return Promise.reject(error)
  },
)

export default apiClient
