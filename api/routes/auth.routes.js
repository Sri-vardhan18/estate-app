import express from 'express' 
import { signIn, signup, google } from '../controlllers/auth.controller.js'
 const authrouter = express.Router()


authrouter.post('/signup',signup) 
authrouter.post('/signin',signIn) 
authrouter.post('/google',google )


export default authrouter