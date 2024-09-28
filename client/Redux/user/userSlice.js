import { createSlice } from '@reduxjs/toolkit'
import { DeleteUser } from '../../../api/controlllers/user.controller'

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
    DeleteUserStart: (state) => {
      state.loading=true
    }, 
    DeleteUserSuccess: (state,action) => {
      state.currentuser=action.payload 
      state.loading=false 
      state.error= null
    }, 
    DeleteUserfailure: (state, action) => {
      state.loading=false 
      state.error = action.payload
    }, 
    signOutUserStart: (state) => {
      state.loading=true
    }, 
    signOutUserSuccess: (state,action) => {
      state.currentuser=action.payload 
      state.loading=false 
      state.error= null
    }, 
    signOutUserfailure: (state, action) => {
      state.loading=false 
      state.error = action.payload
    },
  },
})


export const { signInStart, signInSuccess, signInfailure, updateUserStart,updateUserfailure,updateUserSuccess
,DeleteUserStart,
DeleteUserfailure,
DeleteUserSuccess ,
signOutUserStart,
signOutUserSuccess,
signOutUserfailure

 } = userSlice.actions

export default userSlice.reducer