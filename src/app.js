import express from 'express';
import authRouter from './routes/auth.routes.js';
import onboardingRouter from './routes/onboarding.routes.js';
import homeRouter from './routes/home.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', // Aapke frontend ka URL
    credentials: true
}));

app.use("/api/auth" , authRouter);
app.use("/api/onboarding" , onboardingRouter);
app.use("/api/home/" , homeRouter)

export default app ;