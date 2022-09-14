import {Router} from 'express';
import auth from '../controllers/auth';
import asyncHandler from '../middlewares/asyncHandler';
import { loginValidator, registerValidator } from '../middlewares/validator';

const authRouter:Router = Router();

authRouter.post('/signup', registerValidator,  asyncHandler(auth.signup))
authRouter.post('/login', loginValidator, asyncHandler(auth.login));
authRouter.get('/verify', asyncHandler(auth.verifyEmail))

export default authRouter;