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
    updateUserStart: (state) => {
      state.loading=true
    }, 
    updateUserSuccess: (state,action) => {
      state.currentuser=action.payload 
      state.loading=false 
      state.error= null
    }, 
    updateUserfailure: (state, action) => {
      state.loading=false 
      state.error = action.payload
    },
  },
})


export const { signInStart, signInSuccess, signInfailure, updateUserStart,updateUserfailure,updateUserSuccess } = userSlice.actions

export default userSlice.reducer