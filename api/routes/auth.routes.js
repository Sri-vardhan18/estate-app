import express from 'express' 
import { signIn, signup, google, signOut } from '../controlllers/auth.controller.js'
 const authrouter = express.Router()


authrouter.post('/signup',signup) 
authrouter.post('/signin',signIn) 
authrouter.post('/google',google)
authrouter.get('/signout',signOut)


export default authrouter