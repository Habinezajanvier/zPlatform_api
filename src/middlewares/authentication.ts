import { Request, Response } from "express";
import { decode } from "../helper";


export const authorization = (req: Request, res: Response, next: Function) => {
  try {
    const { token } = req.headers;
    if (!token)
      return res.status(401).json({
        error: "Unable to authenticate",
      });

    const decodedToken = decode(token as string);
    if (!decodedToken)
      return res.status(401).json({
        error: "Unable to authenticate",
      });
    req.user = decodedToken;
    return next();
  } catch (error) {
    return res.status(401).json({
      error: "Unable to authenticate",
    });
  }
};
