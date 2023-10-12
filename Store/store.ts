import { configureStore } from '@reduxjs/toolkit'
import getPostsSlice from './Slice/getPostsSlice'

export const store = configureStore({
  reducer: {
    getPostsSlice,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
