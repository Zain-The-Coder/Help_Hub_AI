import express from 'express';
import completeProfile from '../controllers/onboarding/completeProfile.controller.js';

const onboardingRouter = express.Router();

onboardingRouter.post("/complete-profile" , completeProfile);

export default onboardingRouter ;