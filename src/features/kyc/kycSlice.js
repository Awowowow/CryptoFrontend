import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { kycApi } from '../../services/api'

export const fetchKycStatus = createAsyncThunk('kyc/fetchKycStatus', kycApi.getStatus)
export const submitKyc = createAsyncThunk('kyc/submitKyc', kycApi.submit)
export const uploadKycDocument = createAsyncThunk(
  'kyc/uploadKycDocument',
  kycApi.uploadDocument,
)

const kycSlice = createSlice({
  name: 'kyc',
  initialState: {
    statusData: null,
    status: 'idle',
    actionStatus: 'idle',
    message: '',
    error: '',
  },
  reducers: {
    clearKycFeedback: (state) => {
      state.message = ''
      state.error = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKycStatus.pending, (state) => {
        state.status = 'loading'
        state.error = ''
      })
      .addCase(fetchKycStatus.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.statusData = action.payload.data
      })
      .addCase(fetchKycStatus.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error?.message || 'Unable to load KYC status'
      })
      .addCase(submitKyc.pending, (state) => {
        state.actionStatus = 'loading'
        state.error = ''
        state.message = ''
      })
      .addCase(submitKyc.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        state.message = action.payload.message
      })
      .addCase(submitKyc.rejected, (state, action) => {
        state.actionStatus = 'failed'
        state.error = action.error?.message || 'Unable to submit KYC'
      })
      .addCase(uploadKycDocument.pending, (state) => {
        state.actionStatus = 'loading'
        state.error = ''
        state.message = ''
      })
      .addCase(uploadKycDocument.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        state.message = action.payload.message
      })
      .addCase(uploadKycDocument.rejected, (state, action) => {
        state.actionStatus = 'failed'
        state.error = action.error?.message || 'Unable to upload document'
      })
  },
})

export const { clearKycFeedback } = kycSlice.actions
export default kycSlice.reducer
