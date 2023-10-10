import { configureStore } from '@reduxjs/toolkit'
import isActiveBurger from '../Store/Slice/TableSlice'

import postsReducer from '../Store/Slice/postsSlice'
export const store = configureStore({
  reducer: {
    isActiveBurger,
    postsReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
