import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { marketApi } from '../../services/api'

export const fetchMarketOverview = createAsyncThunk(
  'market/fetchMarketOverview',
  marketApi.getOverview,
)

const marketSlice = createSlice({
  name: 'market',
  initialState: {
    assets: [],
    status: 'idle',
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketOverview.pending, (state) => {
        state.status = state.assets.length ? 'refreshing' : 'loading'
        state.error = ''
      })
      .addCase(fetchMarketOverview.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.assets = action.payload.data
      })
      .addCase(fetchMarketOverview.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error?.message || 'Unable to load market data'
      })
  },
})

export default marketSlice.reducer
