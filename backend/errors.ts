import { Request, Response, NextFunction } from "express";

export const handleCustomErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.msg === "400-duplicate username") {
    const errorResponse = { status: 400, username: err.username, msg: err.msg };
    res.status(400).send(errorResponse);
  }
  console.log(err);
};
