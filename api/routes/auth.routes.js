import express from 'express' 
import { signup } from '../controlllers/auth.controller.js'
 const authrouter = express.Router()


authrouter.post('/signup',signup) 

export default authrouter