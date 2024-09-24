import mongoose  from "mongoose"; 
import { Schema } from "mongoose";


const userSchema = new Schema({ 
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt_NZykul07nU3cliFuRZQr4_q-gOdkRTmRA&s"

    },
} ,{
    timestamps:true
}); 

const User = mongoose.model('User', userSchema) 
export default User 


