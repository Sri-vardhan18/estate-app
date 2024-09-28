import express from 'express'  
import mongoose from 'mongoose'
import dotenv from 'dotenv' 
import userRouter from './routes/user.routes.js' 
import authrouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import { listingrouter } from './routes/listing.routes.js'

dotenv.config()

const app = express()
app.use(express.json()) 
app.use(cookieParser())

const PORT =3000 
mongoose.connect(process.env.MONGO,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000

}).then(()=>{console.log('connected mongoDb')})
.catch((error)=>{
    console.log("error", error)
}) 

app.use('/api/user', userRouter)
app.use('/api/auth',authrouter )
app.use('/api/listing', listingrouter)


app.use((err, req,res,next)=>{
    const statuscode =err.statuscode || 500
    const message =  err .message || "Interal server error"
    return res.status(statuscode).json({
        success:false,
        statuscode,
        message
    })
})

app.listen(PORT ,()=>{
    console.log('server is running on 3000')
})