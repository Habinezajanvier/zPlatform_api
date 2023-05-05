import { Request, Response } from "express";

/**
 * Handles all server error
 * @param func callback function
 * @returns
 */
const asyncHandler =
  (func: Function) => async (req: Request, res: Response, next: Function) => {
    try {
      await func(req, res, next);
    } catch (error: any) {
      res.status(500).json({
        error:
          error.message || "Internal server error, Please try again letter",
      });
    }
  };

export default asyncHandler;
