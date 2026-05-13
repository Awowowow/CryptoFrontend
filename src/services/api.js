import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

const skipRefreshUrls = new Set([
  '/auth/signup',
  '/auth/verify-email',
  '/auth/login',
  '/auth/2fa/verify-login',
  '/auth/refresh',
  '/auth/logout',
])

let refreshRequest = null

const shouldSkipAuthRefresh = (config) => {
  return config?.skipAuthRefresh || skipRefreshUrls.has(config?.url)
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      shouldSkipAuthRefresh(originalRequest)
    ) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      refreshRequest ??= apiClient({
        method: 'POST',
        skipAuthRefresh: true,
        url: '/auth/refresh',
      })

      await refreshRequest

      return apiClient(originalRequest)
    } catch (refreshError) {
      return Promise.reject(refreshError)
    } finally {
      refreshRequest = null
    }
  },
)

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
      skipAuthRefresh: true,
      url: '/auth/signup',
      method: 'POST',
      data: payload,
    }),

  verifyEmail: (token) =>
    request({
      skipAuthRefresh: true,
      url: '/auth/verify-email',
      method: 'GET',
      params: { token },
    }),

  login: (payload) =>
    request({
      skipAuthRefresh: true,
      url: '/auth/login',
      method: 'POST',
      data: payload,
    }),

  verifyTwoFaLogin: (payload) =>
    request({
      skipAuthRefresh: true,
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
      skipAuthRefresh: true,
      url: '/auth/refresh',
      method: 'POST',
    }),

  logout: () =>
    request({
      skipAuthRefresh: true,
      url: '/auth/logout',
      method: 'POST',
    }),
}
