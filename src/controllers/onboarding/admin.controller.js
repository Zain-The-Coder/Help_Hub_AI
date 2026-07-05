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
        const {isAdmin} = await User.findOne({_id : adminTokenOwner});

        
    

    
    const adminChecker = await User.findOne({})
});


export default adminPanel ;