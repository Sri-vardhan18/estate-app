import React from 'react' 
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess, signInfailure } from '../../Redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

function OAuth() {  
  const dispatch = useDispatch() 
  const navigate= useNavigate()


  const handleGoogleClick =async()=>{ 
   try{
    const provider = new GoogleAuthProvider() 
    const auth =getAuth() 
    const result = await signInWithPopup(auth, provider) 
    console.log(result.user.photoURL
      , "photourl")
    const res = await fetch('api/auth/google',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name:result.user.displayName, email:result.user.email, imageURL:result.user.photoURL})
    }) 
    const data =await res.json() 

    if(data.success===false){
      dispatch(signInfailure(data.message))
      return
    }
    else{
      dispatch(signInSuccess(data))
      navigate('/')
    }
    }
    
   catch(error){
    console.log(error)
   }

  }
  return (
    <button  onClick={handleGoogleClick} type ='button'
    className='bg-red-700 text-white rounded-lg uppercase hover:opacity-75'>Continue with Google</button>
  )
}

export default OAuth