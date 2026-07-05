import mongoose from "mongoose";

const createRequestSchema = new mongoose.Schema({
    requesterId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" , 
        required : true
    } ,
    title : {
        type : String ,
        required : true ,
        maxlength : 100
    } ,
    description : {
        type : String , 
        required : true ,
        minlength : 20
    } ,
    tags : {
        type : [String] ,
        default : []
    } ,
    categorey : {
        type : "String" , 
        enum: ["Programming", "Mathematics", "Design", "Career Advice", "Other" , "Study"],
        required : true
    } , 
    urgency: {
        type: String,
        enum: ["Low", "Medium", "High", "Urgent"],
        default: "Medium"
    } ,
    status : {
        type : "String" ,
        enum : ["Pending" , "Solved"] ,
        default : "Pending"
    } ,
    helpers : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User"
    }] ,
    solvedBy : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" ,
        default : null
    }
}, {timestamps : true});

export const createProblemModel = mongoose.model("CreateProblem" , createRequestSchema);