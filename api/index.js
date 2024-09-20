import express from 'express'  
import mongoose from 'mongoose'
import dotenv from 'dotenv' 
import userRouter from './routes/user.routes.js' 
import authrouter from './routes/auth.routes.js'

dotenv.config()

const app = express()
app.use(express.json())

const PORT =3000 
mongoose.connect(process.env.MONGO).then(()=>{console.log('connected mongoDb')})
.catch((error)=>{
    console.log("error", error)
}) 

app.use('/api/user', userRouter)
app.use('/api/auth',authrouter )

app.listen(PORT ,()=>{
    console.log('server is running on 3000')
})