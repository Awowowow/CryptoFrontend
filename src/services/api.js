import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

const request = async (config) => {
  try {
    const response = await apiClient(config)
    return response.data
  } catch (error) {
    const message =
      error.response?.data?.error || error.response?.data?.message || error.message

    throw new Error(message || 'Request failed', { cause: error })
  }
}

export const authApi = {
  signup: (payload) =>
    request({
      url: '/auth/signup',
      method: 'POST',
      data: payload,
    }),

  verifyEmail: (token) =>
    request({
      url: '/auth/verify-email',
      method: 'GET',
      params: { token },
    }),

  login: (payload) =>
    request({
      url: '/auth/login',
      method: 'POST',
      data: payload,
    }),

  verifyTwoFaLogin: (payload) =>
    request({
      url: '/auth/2fa/verify-login',
      method: 'POST',
      data: payload,
    }),

  setupTwoFa: () =>
    request({
      url: '/auth/2fa/setup',
      method: 'POST',
    }),

  verifyTwoFaSetup: (payload) =>
    request({
      url: '/auth/2fa/verify-setup',
      method: 'POST',
      data: payload,
    }),

  verifyRecentTwoFa: (payload) =>
    request({
      url: '/auth/2fa/verify-recent',
      method: 'POST',
      data: payload,
    }),

  refresh: () =>
    request({
      url: '/auth/refresh',
      method: 'POST',
    }),

  logout: () =>
    request({
      url: '/auth/logout',
      method: 'POST',
    }),
}
