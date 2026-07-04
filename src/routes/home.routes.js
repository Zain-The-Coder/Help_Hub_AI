import express from 'express';
import createRequest from '../controllers/requests/createRequest.controller.js';

const homeRouter = express.Router();

homeRouter.post("/create-request" , createRequest);

export default homeRouter ;