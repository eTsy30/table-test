import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'

interface PostsState {
  data: IPost[]
  displayedData: IPost[]
  sortConfig: ISetSortDataPayload
}
export interface ISetSortDataPayload {
  key: 'id' | 'title' | 'body'
  direction: 'ascending' | 'descending'
  displayedData: IPost[]
}
const initialState: PostsState = {
  data: [],
  displayedData: [],
  sortConfig: {
    direction: 'ascending',
    key: 'id',
    displayedData: [],
  },
}
export interface IPost {
  userId: number
  id: number
  title: string
  body: string
}
export interface IStore {
  displayedData: any
  searchText: string
  sortConfig: string
  data: IPost[]
}
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts')

  return response.data.map((post: any) => {
    const { userId, ...rest } = post
    return rest
  })
})
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.data = action.payload
    })
  },
  reducers: {
    setData: (state, action: PayloadAction<IPost[]>) => {
      state.displayedData = action.payload
    },
    setSearchData: (state, action: PayloadAction<string>) => {
      state.displayedData = state.displayedData.filter(
        (item) =>
          item.body.includes(action.payload) ||
          item.title.includes(action.payload)
      )
    },
    setSortData: (state, action: PayloadAction<ISetSortDataPayload>) => {
      state.sortConfig = action.payload
      if (action.payload.key) {
        state.displayedData = [...action.payload.displayedData].sort((a, b) => {
          if (a[action.payload.key] < b[action.payload.key]) {
            return action.payload.direction === 'ascending' ? -1 : 1
          }
          if (a[action.payload.key] > b[action.payload.key]) {
            return action.payload.direction === 'ascending' ? 1 : -1
          }
          return 0
        })
      }
    },
  },
})

export const { setData, setSearchData, setSortData } = postsSlice.actions
export default postsSlice.reducer
