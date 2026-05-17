import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authApi, profileApi } from '../../services/api'



export const signupUser = createAsyncThunk('auth/signupUser', authApi.signup)
export const hydrateSession = createAsyncThunk('auth/hydrateSession', profileApi.getProfile)
export const verifyEmail = createAsyncThunk('auth/verifyEmail', authApi.verifyEmail)
export const forgotPassword = createAsyncThunk('auth/forgotPassword', authApi.forgotPassword)
export const resetPassword = createAsyncThunk('auth/resetPassword', authApi.resetPassword)
export const loginUser = createAsyncThunk('auth/loginUser', authApi.login)
export const verifyTwoFaLogin = createAsyncThunk(
  'auth/verifyTwoFaLogin',
  authApi.verifyTwoFaLogin,
)
export const setupTwoFa = createAsyncThunk('auth/setupTwoFa', authApi.setupTwoFa)
export const verifyTwoFaSetup = createAsyncThunk(
  'auth/verifyTwoFaSetup',
  authApi.verifyTwoFaSetup,
)
export const verifyRecentTwoFa = createAsyncThunk(
  'auth/verifyRecentTwoFa',
  authApi.verifyRecentTwoFa,
)
export const refreshSession = createAsyncThunk('auth/refreshSession', authApi.refresh)
export const logoutUser = createAsyncThunk('auth/logoutUser', authApi.logout)
export const fetchTrustedDevices = createAsyncThunk(
  'auth/fetchTrustedDevices',
  authApi.getTrustedDevices,
)
export const revokeTrustedDevice = createAsyncThunk(
  'auth/revokeTrustedDevice',
  authApi.revokeTrustedDevice,
)

const initialState = {
  user: null,
  sessionChecked: false,
  twoFaToken: '',
  twoFaSetup: null,
  status: 'idle',
  message: '',
  error: '',
  recentTwoFaVerified: false,
  trustedDevices: [],
}

const getErrorMessage = (action) => action.error?.message || 'Something went wrong'

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = ''
      state.error = ''
    },
    clearTwoFaChallenge: (state) => {
      state.twoFaToken = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.message = action.payload.message
      })
      .addCase(hydrateSession.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.data
        state.sessionChecked = true
      })
      .addCase(hydrateSession.rejected, (state) => {
        state.status = 'idle'
        state.sessionChecked = true
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.message = action.payload.message
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.message = action.payload.message
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.message = action.payload.message
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.message = action.payload.message

        if (action.payload.requiresTwoFa) {
          state.twoFaToken = action.payload.data.twoFaToken
          return
        }

        state.user = action.payload.data
        state.twoFaToken = ''
        state.recentTwoFaVerified = false
      })
      .addCase(verifyTwoFaLogin.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.data
        state.twoFaToken = ''
        state.recentTwoFaVerified = true
        state.message = action.payload.message
      })
      .addCase(setupTwoFa.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.twoFaSetup = action.payload.data
        state.message = action.payload.message
      })
      .addCase(verifyTwoFaSetup.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.twoFaSetup = null
        state.message = action.payload.message

        if (state.user) {
          state.user.isTwoFaEnabled = action.payload.data.enabled
        }
      })
      .addCase(verifyRecentTwoFa.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.recentTwoFaVerified = true
        state.message = action.payload.message
      })
      .addCase(refreshSession.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.message = action.payload.message
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = null
        state.twoFaToken = ''
        state.twoFaSetup = null
        state.recentTwoFaVerified = false
        state.trustedDevices = []
        state.message = action.payload.message
      })
      .addCase(fetchTrustedDevices.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.trustedDevices = action.payload.data
      })
      .addCase(revokeTrustedDevice.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.trustedDevices = state.trustedDevices.filter(
          (device) => device.id !== action.meta.arg,
        )
        state.message = action.payload.message
      })
      .addMatcher(
        (action) => action.type.startsWith('auth/') && action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading'
          state.error = ''
          state.message = ''
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('auth/') &&
          action.type.endsWith('/rejected') &&
          action.type !== hydrateSession.rejected.type,
        (state, action) => {
          state.status = 'failed'
          state.error = getErrorMessage(action)
        },
      )
  },
})

export const { clearMessage, clearTwoFaChallenge } = authSlice.actions
export default authSlice.reducer
