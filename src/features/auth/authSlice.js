import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../services/api'



export const signupUser = createAsyncThunk('auth/signupUser', authApi.signup)
export const verifyEmail = createAsyncThunk('auth/verifyEmail', authApi.verifyEmail)
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

const initialState = {
  user: null,
  twoFaToken: '',
  twoFaSetup: null,
  status: 'idle',
  message: '',
  error: '',
  recentTwoFaVerified: false,
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
      .addCase(verifyEmail.fulfilled, (state, action) => {
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
        (action) => action.type.startsWith('auth/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed'
          state.error = getErrorMessage(action)
        },
      )
  },
})

export const { clearMessage, clearTwoFaChallenge } = authSlice.actions
export default authSlice.reducer
