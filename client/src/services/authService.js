import axiosClient from '../config/axios'

export const authService = {
    login
}

function login(email, password) {
    return axiosClient.post('/api/auth', {
        email,
        password
    })
}