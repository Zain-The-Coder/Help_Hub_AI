import express from 'express';
import authRouter from './routes/auth.routes.js';
import onboardingRouter from './routes/onboarding.routes.js';
import homeRouter from './routes/home.routes.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json())
app.use(cookieParser());

app.use("/api/auth" , authRouter);
app.use("/api/onboarding" , onboardingRouter);
app.use("/api/home/" , homeRouter)

export default app ;