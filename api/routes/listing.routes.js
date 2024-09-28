import express from 'express' 
import { creatListing } from '../controlllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

export const listingrouter = express.Router();

listingrouter.post('/create', verifyToken ,creatListing) 

