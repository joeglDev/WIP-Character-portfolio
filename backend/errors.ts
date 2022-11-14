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
  } else if (err.msg === "404-user not found") {
    const responseBody = {
      invalid_user: { status: 404, username: err.username, msg: err.msg },
    };
    res.status(404).send(responseBody);
  } else if (err.msg === "404-character not found") {
    const responseBody = {
      invalid_character: { status: 404, id: err.id, msg: err.msg },
    };
    res.status(404).send(responseBody);
  } else if (err.message === "400- invalid character update request body") {
    const responseBody = {
      invalid_body: { status: 400, msg: err.message},
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
