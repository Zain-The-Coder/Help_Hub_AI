import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" ,
        required : true ,
        unique : true
    } ,
    skills : {
        type : [String] ,
        required : true
    } ,
    interests : {
        type : [String] ,
        required : true
    } ,
    location : {
        type : String , 
        required : true
    } ,
    trustScore : {
        type : Number ,
        default : 0 
    } ,
    badges : {
        type : [String] ,
        default : []
    } ,
    contributions : {
        type : Number ,
        default : 0
    }
} , {timestamps : true});

export const profileModel = mongoose.model("Profile" , profileSchema);