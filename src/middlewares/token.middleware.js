import JWT from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import config from '../config/config.js';

const tokenValidator = asyncHandler(async (req , res) => {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    if(!token) {
        return res.status(404).json({
            status : 404 ,
            message : "Token not found !"
        })
    };

    try {
        JWT.verify(token , config.JWT_SECRET);
    } catch (e) {
        return res.status(409).json({
            status : 401 , 
            message : "Invalid Token !"
        })
    }
    
})