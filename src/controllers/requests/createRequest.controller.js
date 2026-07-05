import express from 'express' ;
import asyncHandler from '../../utils/asyncHandler.js';
import { createProblemModel } from '../../models/createRequest.model.js';
import requestNotification from '../../utils/notification.js';
import { User } from '../../models/user.model.js';
import JWt from 'jsonwebtoken' ;
import config from '../../config/config.js';

const createRequest = asyncHandler(async (req , res) => {
    const {requesterId , title , description , tags , categorey , urgency , status} = req.body ;

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
    
    const tokenOwner = tokenOwnerId.id

    if(!title || !description || !tags || !categorey || !urgency) {
        return res.status(401).json({
            status : 401 ,
            message : "All Fields Are Required !"
        })
    };

    if(title.length > 100) {
        return res.status(403).json({
            status : 403 ,
            message : "Title is too long !"
        })
    };

    if(description.length < 20) {
        return res.status(403).json({
            status : 403 ,
            message : "description is too short !"
        })
    };

    const request = await createProblemModel.create({
        requesterId : tokenOwner ,
        title , 
        description , 
        tags , 
        categorey , 
        urgency , 
        status
    });

    const receiverId = await User.findOne({role : "Can Help"}).select("-isAdmin");

    const type = "One Request for you has been posted . "

    if(receiverId === null) {
        res.status(201).json({
            status : 201 ,
            message : "Problem Request Created !" , 
            problemDetails : request ,
            notifier : "Notification is not send to anyone because no one in this platform currently solving the problem"
        })
    } else {
        res.status(201).json({
            status : 201 ,
            message : "Problem Request Created !" , 
            problemDetails : request
        });

        requestNotification(receiverId , type , title)
    }
});

export default createRequest ;