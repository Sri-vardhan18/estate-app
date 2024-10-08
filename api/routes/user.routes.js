import express from 'express'
import {DeleteUser, test, updateUser, getUserListing} from '../controlllers/user.controller.js' 
import { verifyToken } from '../utils/verifyUser.js';
const userRouter = express.Router(); 


userRouter.get('/test',test)  
userRouter.post('/update/:id', verifyToken, updateUser) 
userRouter.delete('/delete/:id', verifyToken, DeleteUser)  
userRouter.get('/listing/:id',verifyToken , getUserListing)


export default userRouter