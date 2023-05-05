import { Router, Request, Response } from "express";
import authRouter from "./auth";
import userRouter from "./users";

const router: Router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to z-Platform api" });
});

// All routes handler should be here
router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;
