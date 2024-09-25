import React from 'react' 
import { useSelector } from 'react-redux'


function Profile() { 
  const {currentuser}= useSelector(state=>state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentuser.avatar} alt="profile"
        className='h-24 w-24  rounded-full object-cover cursor-pointer self-center mt-2'/> 
        <input  type ="text" placeholder='username' id='username'
        className='p-3  rounded-lg border'/> 
        <input  type ="email" placeholder='email' id='email' 
        className='p-3  rounded-lg border'/>
        <input  type ="password" placeholder='password' id='password' 
        className='p-3  rounded-lg border'/> 
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>update</button>
      </form> 
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span> 
        <span className='text-red-700 cursor-pointer'>sign out</span>
      </div>
    </div>
  )
}

export default Profile