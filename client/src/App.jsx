import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Header from './component/Header'
import PrivateRoute from './component/PrivateRoute'
import CreateListing from './pages/CreatListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'

function App() {
  return (
    <>
     <BrowserRouter>  
     <Header />
     <Routes>
       <Route path ='/' element ={<Home />} />
       <Route path ='/sign-in' element ={<SignIn />} />
       <Route path ='/sign-up' element ={<SignUp />} />
       <Route path ='/about' element ={<About />} />  
       <Route path ='/listing/:id' element ={<Listing />} />  
       <Route  element={<PrivateRoute/>} >
       <Route path ='/profile' element ={<Profile />} />
       <Route path ='/create-listing' element ={<CreateListing />} />
       <Route path ='/update-listing/:id' element ={<UpdateListing />} />
       </Route>
       
     </Routes>
     </BrowserRouter> 
    </>
   
  )
}

export default App