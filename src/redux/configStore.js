import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice'
import courseSlice from './slice/courseSlice'
export const store = configureStore({
  reducer: {
    userSlice,
    courseSlice
  },
})

