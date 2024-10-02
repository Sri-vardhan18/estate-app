import Listing from "../models/listing.model.js"
import { errorhandlers } from "../utils/errors.js"

export const creatListing=async(req,res,next)=>{
    try{ 
        const listing = await Listing.create(req.body) 
        return res.status(201).json(listing)
    } 
    catch(error){ 
        next(error)

    }
} 

export const deleteListing=async(req,res, next)=>{ 
    const listing = await Listing.findById(req.params.id) 
    if(!listing) return next(errorhandlers(401, 'listing not found')) 
    if (req.user.id !== listing.userRef){
        return next(errorhandlers(401, 'you can only delete your own listing')) 
    } 
    try{
        await Listing.findByIdAndDelete(req.params.id) 
        res.status(200).json({ success: true, message: 'Deleted successfully' })
    } 
    catch(error) {
        next(error)
    }
} 
export const updateListing=async(req,res,next)=>{ 
    
    const listing = await Listing.findById(req.params.id) 
    if(!listing) return next(errorhandlers(401, 'listing not found'))  
    if (req.user.id !== listing.userRef){
            return next(errorhandlers(401, 'you can only update your own listing')) 
        } 
    
    try{
        const updateListing = await Listing.findByIdAndUpdate(req.params.id
            ,req.body,{new:true}
        ) 
        res.status(200).json(updateListing)
    }
    catch(error){
        next(error)
    } 

} 

export const getListing=async(req,res, next)=>{ 
    try{
        const listing = await Listing.findById(req.params.id)  
        if(!listing) {
            return next(errorhandlers(404, 'not found'))

        }
        res.status(200).json(listing)

    } 
    catch(error){
        next(error)
    }
 
}