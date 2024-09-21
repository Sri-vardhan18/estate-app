import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentuser: null,
    error:null,
    loading :false

}
 
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading=true
    },
    signInSuccess: (state,action) => {
      state.currentuser=action.payload 
      state.loading=false 
      state.error= null
    },
    signInfailure: (state, action) => {
      state.loading=false 
      state.error = action.payload
    },
  },
})


export const { signInStart, signInSuccess, signInfailure } = userSlice.actions

export default userSlice.reducer