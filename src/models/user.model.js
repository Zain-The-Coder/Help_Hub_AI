import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username : {
        type : String ,
        required : [true , "username is required"] ,
    } ,
     email : {
        type : String ,
        required : [true , "email is required" ],
        unique : [true , "email is already taken" ]
    } ,
    password : {
        type : String , 
        required : [true , "password is required"] ,
    } ,
    role : {
        type : String ,
        enum : [
            "Cam Help" , "Need Help" , "Both"
        ] ,
        default : "Need Help"
    }
} , {timestamps : true});

userSchema.pre("save" , async function hashPassword () {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password , salt);

    this.password = hashedPassword ;
})

export const User = mongoose.model("User" , userSchema);