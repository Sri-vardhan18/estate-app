
import { errorhandlers } from "../utils/errors.js";
import bcryptjs from 'bcryptjs'
import User from "../models/user.model.js";

export const test =(req, res)=>{
    res.json({
        message:'api working'
    })
}  

export const updateUser=async(req, res, next)=>{
    if(req.user.id !== req.params.id) return next(errorhandlers(401, 'You can only update your own account')) 
    try{
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)       
        } 
        const updateduser = await User.findByIdAndUpdate(req.params.id,{ 
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar,

            }, 
         
        },    {new:true}) 
        const {password, ...rest}= updateduser._doc 
        res.status(200).json(rest)

} 
    catch(error){
        next(error)
    }
}