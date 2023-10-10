import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export interface IPost {
  userId: number
  id: number
  title: string
  body: string
}
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  console.log(response.data, 'response.data')

  return response.data
})
const initialState: IPost = {
  userId: 0,
  id: 0,
  title: '',
  body: '',
}
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state: IPost, action) => {
      state.body = action.payload
    })
  },
})

export default postsSlice.reducer