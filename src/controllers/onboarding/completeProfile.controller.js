import { User } from "../../models/user.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import JWT from 'jsonwebtoken';
import config from '../../config/config.js'
import { profileModel } from "../../models/profile.model.js";

const completeProfile = asyncHandler(async (req , res) => {
    const {skills , interests , location} = req.body ;
    const token = req.cookies.token || req.headers.authorizations.split(" ")[1];

    if(!token) {
        return res.status(404).json({
            status : 400 ,
            message : "Token Not Found !"
        })
    };

    if(!skills || !interests || !location) {
        return res.status(403).json({
            status : 403 ,
            message : "All fields are required !"
        })
    };

    let decoded;
        try {
            decoded = JWT.verify(token, config.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ status: 401, message: "Invalid or Expired Token" });
        }


    const userId = decoded.id ;

    const existingProfile = await profileModel.findOne(userId);

    if(existingProfile) {
        return res.status(409).json({
            status : 409 ,
            message : "Profile Already Completed !"
        })
    };

    const userProfile = await profileModel.create({
        userId ,
        skills ,
        interests ,
        location
    });

    res.status(201).json({
        status : 201 ,
        message : "Profile Completed Successfully !" ,
        userData : userProfile
    })
});

export default completeProfile ;