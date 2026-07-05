import express from 'express';
import completeProfile from '../controllers/onboarding/completeProfile.controller.js';
import multer from 'multer';

const onboardingRouter = express.Router();

const upload = multer({
    storage : multer.memoryStorage()
});

onboardingRouter.post("/complete-profile" , upload.single('image') , completeProfile);

export default onboardingRouter ;