import axiosClient from './axios'

const tokenAuth = token => {
  if (token) {
    localStorage.setItem('token', token)
    axiosClient.defaults.headers.common.Authorization = 'Bearer ' + token
  } else {
    localStorage.removeItem('token')
    delete axiosClient.defaults.headers.common.Authorization
  }
}

export default tokenAuth
