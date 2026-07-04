import express from 'express' ;
import asyncHandler from '../../utils/asyncHandler.js';
import { createProblemModel } from '../../models/createRequest.model.js';

const createRequest = asyncHandler(async (req , res) => {
    const {title , description , tags , categorey , urgency , status} = req.body ;

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
        title , 
        description , 
        tags , 
        categorey , 
        urgency , 
        status
    });

    res.status(201).json({
        status : 201 ,
        message : "Problem Request Created !" , 
        problemDetails : request
    })
});

export default createRequest ;