import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { profileApi } from '../../services/api'

export const fetchProfile = createAsyncThunk('profile/fetchProfile', profileApi.getProfile)

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null,
    status: 'idle',
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading'
        state.error = ''
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload.data
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error?.message || 'Unable to load profile'
      })
  },
})

export default profileSlice.reducer
