import express from 'express'  
import mongoose from 'mongoose'
import dotenv from 'dotenv' 
import userRouter from './routes/user.routes.js' 
// import userRouter from './routes/user.routes.js';

dotenv.config()

const app = express()

const PORT =3000 
mongoose.connect(process.env.MONGO).then(()=>{console.log('connected mongoDb')})
.catch((error)=>{
    console.log("error", error)
}) 

app.use('/api/user', userRouter)

app.listen(PORT ,()=>{
    console.log('server is running on 3000')
})