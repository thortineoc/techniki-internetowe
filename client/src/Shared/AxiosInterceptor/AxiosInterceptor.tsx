import axios from 'axios'

// Add a request interceptor
export default function setupAxiosToken(token: string) {
  console.log('kulturalnie a nie')
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
