import express from 'express';
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({ 
    receiverId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" ,
        required : true
    } ,
    title : {
        type : String ,
        enum : ["New Request" , "Help Updates" , "Status Change"] ,
        default : "New Request" ,
        required : true
    } ,
    message : {
        type : String ,
        required : true
    } ,
    isRead : {
        type : Boolean ,
        default : false
    }
} , {timestamps : true});

export const notificationModel = mongoose.model("Notification" , notificationSchema);