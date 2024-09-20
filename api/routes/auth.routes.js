import express from 'express' 
import { signIn, signup } from '../controlllers/auth.controller.js'
 const authrouter = express.Router()


authrouter.post('/signup',signup) 
authrouter.post('/signin',signIn)

export default authrouter