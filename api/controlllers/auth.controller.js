import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs';
import { errorhandlers } from "../utils/errors.js";

export const signup=async(req,res, next)=>{
    const {username , email, password} = req.body  
    const hashpassword = bcryptjs.hashSync(password, 10)
    const newuser =  new User({username , email, password: hashpassword} )
    try{
        await newuser.save()
        res.status(201).json({message:'created successfully'})
    }
    catch(error){
        // res.status(500).json(error.message) 
        next(error)
    }
}