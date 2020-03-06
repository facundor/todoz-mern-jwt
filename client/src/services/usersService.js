import axiosClient from '../config/axios'

export const usersService = {
  create
}

function create (user) {
  return axiosClient.post('/api/users', user)
}
