import axios from 'axios'

// Add a request interceptor
export default function setupAxiosToken(token: string) {
  console.log('kurde')
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
