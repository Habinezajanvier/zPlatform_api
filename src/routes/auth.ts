import { Router } from "express";
import controller from "../controllers";
import asyncHandler from "../middlewares/asyncHandler";
import { loginValidator, registerValidator } from "../middlewares/validator";

const { auth } = controller;

const authRouter: Router = Router();

authRouter.post("/signup", registerValidator, asyncHandler(auth.signup));
authRouter.post("/login", loginValidator, asyncHandler(auth.login));
authRouter.post("/login/otp", asyncHandler(auth.loginWithOtp));
authRouter.get("/verify", asyncHandler(auth.verifyEmail));
authRouter.post("/forget", asyncHandler(auth.forgetPassword));
authRouter.put("/reset", asyncHandler(auth.resetPassword));

export default authRouter;
