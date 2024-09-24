import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs';
import { errorhandlers } from "../utils/errors.js";
import jwt from 'jsonwebtoken'

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

export const signIn =async(req,res, next)=>{
    const {email, password} = req.body 
    try{
        const validUser = await User.findOne({email}) 
    if(!validUser) return next(errorhandlers(404, 'invalid user')) 
    const validpassword = bcryptjs.compareSync(password, validUser.password)
    if(!validpassword) return next(errorhandlers(404, 'invalid credentials')) 
    const token = jwt.sign({id :validUser._id}, 
            process.env.JWT_SECRET_KEY)   
    const {password:pass, ...rest} = validUser._doc
    res.cookie('access_token', token, {httpOnly:true}) 
    .status(200).json(rest)
    } 
    catch(error ){
        next(error)
    }
}  


export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
            const { password, ...rest } = user._doc; // Destructuring correctly
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashpassword = bcryptjs.hashSync(generatedPassword, 10);
            const newuser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashpassword,
                avatar: req.body.imageURL
            });
            await newuser.save();
            const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET_KEY);
            const { password, ...rest } = newuser._doc; // Destructuring correctly
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};



