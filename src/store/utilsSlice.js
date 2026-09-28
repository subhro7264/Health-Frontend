import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "",
}

export const counterSlice = createSlice({
  name: 'changeView',
  initialState,
  reducers: {
    changeView: (state, action) => {
      state.value = action.payload
    },

  },
})


export const { changeView, } = counterSlice.actions

export default counterSlice.reducer