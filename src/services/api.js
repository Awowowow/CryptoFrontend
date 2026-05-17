import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
})

const skipRefreshUrls = new Set([
  '/auth/signup',
  '/auth/verify-email',
  '/auth/forgot-password',
  '/auth/reset-password',
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

  forgotPassword: (payload) =>
    request({
      skipAuthRefresh: true,
      url: '/auth/forgot-password',
      method: 'POST',
      data: payload,
    }),

  resetPassword: (payload) =>
    request({
      skipAuthRefresh: true,
      url: '/auth/reset-password',
      method: 'POST',
      data: payload,
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

  getTrustedDevices: () =>
    request({
      url: '/auth/2fa/trusted-devices',
      method: 'GET',
    }),

  revokeTrustedDevice: (trustedDeviceId) =>
    request({
      url: `/auth/2fa/trusted-devices/${trustedDeviceId}`,
      method: 'DELETE',
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

export const profileApi = {
  getProfile: () =>
    request({
      url: '/user/profile',
      method: 'GET',
    }),
}

export const kycApi = {
  getStatus: () =>
    request({
      url: '/kyc/status',
      method: 'GET',
    }),

  submit: (payload) =>
    request({
      url: '/kyc/submit',
      method: 'POST',
      data: payload,
    }),

  uploadDocument: ({ file, fileType }) => {
    const formData = new FormData()
    formData.append('fileType', fileType)
    formData.append('document', file)

    return request({
      url: '/kyc/documents',
      method: 'POST',
      data: formData,
    })
  },
}

export const walletApi = {
  getBalances: () =>
    request({
      url: '/wallet/balances',
      method: 'GET',
    }),
}

export const marketApi = {
  getOverview: () =>
    request({
      skipAuthRefresh: true,
      url: '/market/overview',
      method: 'GET',
    }),
}

export const adminKycApi = {
  getSubmissions: (status) =>
    request({
      url: '/admin/kyc/submissions',
      method: 'GET',
      params: status ? { status } : undefined,
    }),

  getSubmission: (submissionId) =>
    request({
      url: `/admin/kyc/submissions/${submissionId}`,
      method: 'GET',
    }),

  reviewSubmission: ({ submissionId, ...payload }) =>
    request({
      url: `/admin/kyc/submissions/${submissionId}/review`,
      method: 'PATCH',
      data: payload,
    }),
}
