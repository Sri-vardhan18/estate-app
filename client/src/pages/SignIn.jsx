import React, { useState } from 'react' 
import {Link,useNavigate} from 'react-router-dom'


function SignIn() { 
  const [formData, setFormData] = useState({}) 
  const [error,setError] = useState(null) 
  const [loading, setLoading] = useState(false) 
  const navigate = useNavigate()
  const handleChange=(e)=>{
    const {id, value} = e.target 
    setFormData({
      ...formData,
      [id]: value
    })
  } 

  const handleSubmit=async(e)=>{
    e.preventDefault()  

    try{  
      setLoading(true)
    const res = await fetch('api/auth/signin',
      {
        method:"POST",
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)
      }
    )
    const data = await res.json()  
    if(data.success){
      setError(null) 
      setLoading(false)
      navigate('/')
    }
    else{
      setLoading(false) 
    setError(data.message)
    }
    }
    catch(error){
      setError(data.message)
      setLoading(false)
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center front-semibold">sign In</h1>
      <form className="flex flex-col gap-4" onSubmit ={handleSubmit}>
        
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled: opacity-80" 
        disabled={loading}>
          {loading ? 'Loading...': 'signin' }
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have a account ?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">singIn</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}

export default SignIn