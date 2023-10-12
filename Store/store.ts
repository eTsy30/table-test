import { configureStore } from '@reduxjs/toolkit'
import postsSlice from './Slice/postsSlice'

export const store = configureStore({
  reducer: {
    postsSlice,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
