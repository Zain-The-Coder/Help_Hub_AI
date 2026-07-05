import express from 'express';
import createRequest from '../controllers/requests/createRequest.controller.js';
import adminPanel from '../controllers/onboarding/admin.controller.js';

const homeRouter = express.Router();

homeRouter.post("/create-request" , createRequest);
homeRouter.get("/admin" , adminPanel)

export default homeRouter ;