import {Router} from 'express';
import controller from '../controllers';
import asyncHandler from '../middlewares/asyncHandler';
import { authorization } from '../middlewares/authentication';
import { validateId } from '../middlewares/validator/userValidator';

const userRouter:Router = Router();
const {user} = controller;

userRouter.get('/', asyncHandler(user.getAllUsers));
userRouter.get('/me', authorization, asyncHandler(user.getSelfProfile));
userRouter.put('/update', authorization, asyncHandler(user.updateSelf));
userRouter.get('/:id', asyncHandler(validateId), authorization, asyncHandler(user.getOneUser));
userRouter.put('/:id', asyncHandler(validateId), authorization, asyncHandler(user.updateUser));
userRouter.delete('/:id', asyncHandler(validateId), authorization, asyncHandler(user.deleteUser));

export default userRouter;

