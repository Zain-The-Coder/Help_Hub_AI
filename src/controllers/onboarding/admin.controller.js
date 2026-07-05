import asyncHandler from "../../utils/asyncHandler.js";
import JWt from 'jsonwebtoken' ;
import config from "../../config/config.js";
import { User } from "../../models/user.model.js";

const adminPanel = asyncHandler(async (req , res) => {

   const token = req.cookies.token || req.headers.authorization.split(' ')[1] ;

    let tokenOwnerId ;
        try {
            tokenOwnerId = JWt.verify(token , config.JWT_SECRET); 
        }catch (e) {
            return res.status(403).json({
                status : 403 ,
                message : e.message
            })
        };
    
        const adminTokenOwner = tokenOwnerId.id ;
        const user = await User.findOne({_id : adminTokenOwner});

        if(!user) {
            return res.status(404).json({
                status : 404 ,
                message : "User not found !"
            })
        };

        if(user.isAdmin == false) {
            return res.status(403).json({
                status : 403 ,
                check : user.isAdmin ,
                message : "You are not an admin!"
            })
        }
        const data = await User.find();
        
        res.status(200).json({
            status : 200 ,
            message : "User fetched successfully !" ,
            users : data 
        })
    
});


export default adminPanel ;