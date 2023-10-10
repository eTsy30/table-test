import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IActiveBurger {
  isActiveBurger: any
  value: boolean
}
const initialState: IActiveBurger = {
  value: true,
  isActiveBurger: undefined,
}

export const isActiveBurger = createSlice({
  name: 'isActiveBurgers',
  initialState,
  reducers: {
    setBurgerActive: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})
export default isActiveBurger.reducer
export const { setBurgerActive } = isActiveBurger.actions
