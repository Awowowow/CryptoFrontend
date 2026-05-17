import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { adminKycApi } from '../../services/api'

export const fetchAdminKycSubmissions = createAsyncThunk(
  'adminKyc/fetchSubmissions',
  adminKycApi.getSubmissions,
)
export const fetchAdminKycSubmission = createAsyncThunk(
  'adminKyc/fetchSubmission',
  adminKycApi.getSubmission,
)
export const reviewAdminKycSubmission = createAsyncThunk(
  'adminKyc/reviewSubmission',
  adminKycApi.reviewSubmission,
)

const adminKycSlice = createSlice({
  name: 'adminKyc',
  initialState: {
    submissions: [],
    selectedSubmission: null,
    listStatus: 'idle',
    detailStatus: 'idle',
    reviewStatus: 'idle',
    message: '',
    error: '',
  },
  reducers: {
    clearSelectedSubmission: (state) => {
      state.selectedSubmission = null
    },
    clearAdminKycFeedback: (state) => {
      state.message = ''
      state.error = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminKycSubmissions.pending, (state) => {
        state.listStatus = 'loading'
        state.error = ''
      })
      .addCase(fetchAdminKycSubmissions.fulfilled, (state, action) => {
        state.listStatus = 'succeeded'
        state.submissions = action.payload.data
      })
      .addCase(fetchAdminKycSubmissions.rejected, (state, action) => {
        state.listStatus = 'failed'
        state.error = action.error?.message || 'Unable to load submissions'
      })
      .addCase(fetchAdminKycSubmission.pending, (state) => {
        state.detailStatus = 'loading'
        state.error = ''
      })
      .addCase(fetchAdminKycSubmission.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded'
        state.selectedSubmission = action.payload.data
      })
      .addCase(fetchAdminKycSubmission.rejected, (state, action) => {
        state.detailStatus = 'failed'
        state.error = action.error?.message || 'Unable to load submission'
      })
      .addCase(reviewAdminKycSubmission.pending, (state) => {
        state.reviewStatus = 'loading'
        state.error = ''
        state.message = ''
      })
      .addCase(reviewAdminKycSubmission.fulfilled, (state, action) => {
        state.reviewStatus = 'succeeded'
        state.message = action.payload.message
      })
      .addCase(reviewAdminKycSubmission.rejected, (state, action) => {
        state.reviewStatus = 'failed'
        state.error = action.error?.message || 'Unable to review submission'
      })
  },
})

export const { clearAdminKycFeedback, clearSelectedSubmission } = adminKycSlice.actions
export default adminKycSlice.reducer
