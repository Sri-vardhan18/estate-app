import express from 'express' 
import { creatListing, deleteListing, updateListing, getListing } from '../controlllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

export const listingrouter = express.Router();

listingrouter.post('/create', verifyToken ,creatListing) 
listingrouter.delete('/deletelisting/:id', verifyToken, deleteListing)
listingrouter.post('/update/:id', verifyToken, updateListing)
listingrouter.get('/get/:id', getListing  )
