// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { IPost } from './getPostsSlice'

// interface PostsState {
//   data: IPost[]
//   displayedData: IPost[]
//   sortConfig: {
//     key: string | null
//     direction: 'ascending' | 'descending'
//   }
// }

// const initialState: PostsState = {
//   data: [],
//   displayedData: [],
//   sortConfig: {
//     key: null,
//     direction: 'ascending',
//   },
// }

// const postsSlice = createSlice({
//   name: 'posts',
//   initialState,
//   reducers: {
//     setData: (state, action: PayloadAction<IPost[]>) => {
//       state.data = action.payload
//       state.displayedData = action.payload
//     },
//     setSearchText: (state, action: PayloadAction<string>) => {
//       state.displayedData = state.data.filter(
//         (item) =>
//           item.body.includes(action.payload) ||
//           item.title.includes(action.payload)
//       )
//     },
//     setSortConfig: (
//       state,
//       action: PayloadAction<{
//         key: string
//         direction: 'ascending' | 'descending'
//       }>
//     ) => {
//       state.sortConfig = action.payload
//       if (action.payload.key) {
//         state.displayedData = [...state.displayedData].sort((a, b) => {
//           if (a[action.payload.key] < b[action.payload.key]) {
//             return action.payload.direction === 'ascending' ? -1 : 1
//           }
//           if (a[action.payload.key] > b[action.payload.key]) {
//             return action.payload.direction === 'ascending' ? 1 : -1
//           }
//           return 0
//         })
//       }
//     },
//   },
// })

// export const { setData, setSearchText, setSortConfig } = postsSlice.actions
// export default postsSlice.reducer
