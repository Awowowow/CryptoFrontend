import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { walletApi } from '../../services/api'

export const fetchWalletBalances = createAsyncThunk(
  'wallet/fetchWalletBalances',
  walletApi.getBalances,
)

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    balances: [],
    status: 'idle',
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletBalances.pending, (state) => {
        state.status = 'loading'
        state.error = ''
      })
      .addCase(fetchWalletBalances.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.balances = action.payload.data
      })
      .addCase(fetchWalletBalances.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error?.message || 'Unable to load wallet balances'
      })
  },
})

export default walletSlice.reducer
