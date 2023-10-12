import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export interface IPost {
  userId: number
  id: number
  title: string
  body: string
}
export interface IStore {
  displayedData: any
  searchText: any
  sortConfig: any
  data: IPost[]
}
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  console.log(response.data, 'response.data')

  return response.data
})
const initialState: IStore = {
  data: [],
  displayedData: undefined,
  searchText: undefined,
  sortConfig: undefined,
}
const getPostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state: IStore, action) => {
      state.data = action.payload
    })
  },
})

export default getPostsSlice.reducer
