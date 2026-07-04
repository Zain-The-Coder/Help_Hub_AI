import express from 'express';
import registerUser from '../controllers/auth/register.controller.js';
import loginUser from '../controllers/auth/login.controller.js';

const authRouter = express.Router();

authRouter.post("/register" , registerUser);
authRouter.post("/login" , loginUser)

export default authRouter