import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username : {
        type : String , 
        required : true ,
    } ,
    requests : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "CreateProblem" ,
        default : []
    }] ,
    totalUsers : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" ,
        default : 0
    } 
});

export const adminModel = mongoose.model("Admin" , adminSchema);