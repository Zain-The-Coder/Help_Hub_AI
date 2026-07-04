import express from 'express';
import asyncHandler from '../../utils/asyncHandler.js';
import { User } from '../../models/user.model.js';
import bcrypt from 'bcrypt' ;
import JWT from 'jsonwebtoken';
import config from '../../config/config.js';

const loginUser = asyncHandler(async (req , res) => {
    const {email , password} = req.body ;

    if(!email || !password) {
        return res.status(404).json({
            status : 401 ,
            message : "All Fields Are Required !"
        })
    };

    const user = await User.findOne({
        email : email
    });

    if(!user) {
        return res.status(404).json({
            status : 404 ,
            message : "User Not Found"
        })
    };

    const isPasswordMatched = await bcrypt.compare(password , user.password);

    if(!isPasswordMatched) {
        return res.status(401).json({
            status : 401 ,
            message : "Invalid Email or Password"
        })
    };

    const token = JWT.sign({
        id : user._id ,
    } , config.JWT_SECRET , 
    {expiresIn : "3d"});
    

    res.cookie("token" , token , {
        httpOnly : true ,
        secure : true ,
        sameSite : 'None' ,
        maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
    });


    res.status(200).json({
        status : 200 ,
        message : "Login Successfully !" ,
        user_Data :  user ,
        token : token
    });
});

export default loginUser ;