import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import profileReducer from '../features/profile/profileSlice'
import walletReducer from '../features/wallet/walletSlice'
import kycReducer from '../features/kyc/kycSlice'
import adminKycReducer from '../features/admin/adminKycSlice'
import marketReducer from '../features/market/marketSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    wallet: walletReducer,
    kyc: kycReducer,
    adminKyc: adminKycReducer,
    market: marketReducer,
  },
})
