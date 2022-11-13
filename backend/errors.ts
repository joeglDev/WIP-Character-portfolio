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
  } else if (err.msg === "400-invalid response body") {
    const responseBody = {
      invalid_body: { status: 400, username: err.username, msg: err.msg },
    };
    res.status(400).send(responseBody);
  }
};

export const handleInvalidPaths = (req: Request, res: Response) => {
  const reponseBody = {
    invalid_request: { status: 404, msg: "404-invalid endpoint" },
  };
  res.status(404).send(reponseBody);
};
