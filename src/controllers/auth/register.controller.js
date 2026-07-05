import express from 'express';
import asyncHandler from '../../utils/asyncHandler.js';
import { User } from '../../models/user.model.js';
import config from '../../config/config.js';
import JWT from 'jsonwebtoken';

const registerUser = asyncHandler(async (req , res) => {
    const {username , email , password , role} = req.body ;

    if(!username || !email || !password) {
        return res.status(401).json({
            statis : 401 ,
            message : "All fields are required !"
        })
    };

    if(password.length < 6) {
        return res.status(400).json({
            status : 400 ,
            message : "Password Is Too short !"
        })
    };

    const isEmailExist = await User.findOne({
        email : email
    }).select("-isAdmin");

    if(isEmailExist) {
        return res.status(403).json({
            status : 403 ,
            message : "Email adresss already taken by another user"
        })
    };

    const newUser = await User.create({
        username , email , password , role
    });

    const token = JWT.sign({
        id : newUser._id 
    } , config.JWT_SECRET , 
    {expiresIn : "3d"});

    res.cookie("token" , token , {
        httpOnly : true ,
        secure : true , 
        sameSite : 'None' ,
        maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
    });

    res.status(201).json({
        status : 201 ,
        message : "User Created Successfully !" ,
        user_Data : newUser ,
        token : token
    })
})

export default registerUser ;