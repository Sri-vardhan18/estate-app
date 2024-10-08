import { errorhandlers } from "../utils/errors.js";
import jwt from 'jsonwebtoken'
export const verifyToken =(req, res, next)=>{ 
    const token = req.cookies.access_token 
    if(!token) return next(errorhandlers(401, 'Unauthorized')) 
    
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
            if(err) return next(errorhandlers(403, 'Forbidden')) 
            req.user = user
            next()
        })
}