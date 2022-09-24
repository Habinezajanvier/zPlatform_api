import {Router} from 'express';
import users from '../controllers/users';
import asyncHandler from '../middlewares/asyncHandler';
import { authorization } from '../middlewares/authentication';
import { validateId } from '../middlewares/validator/userValidator';

const userRouter:Router = Router();

userRouter.get('/', asyncHandler(users.getAllUsers));
userRouter.get('/me', authorization, asyncHandler(users.getSelfProfile));
userRouter.put('/update', authorization, asyncHandler(users.updateSelf));
userRouter.get('/:id', asyncHandler(validateId), authorization, asyncHandler(users.getOneUser));
userRouter.put('/:id', asyncHandler(validateId), authorization, asyncHandler(users.updateUser));
userRouter.delete('/:id', asyncHandler(validateId), authorization, asyncHandler(users.deleteUser));

export default userRouter;

