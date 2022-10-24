import {
  createNewUser,
  selectAllCharacters,
  selectUser,
} from "../models/models-funcs";
import { Request, Response, NextFunction } from "express";
import { nextTick } from "process";

//objects
interface loginResponseObject {
  login_response: { username: string; outcome: string };
}
interface registationResponseObject {
  registration_response: { username: string; msg: string };
}

export const postLogin = async (req: Request, res: Response) => {
  try {
    const username: string = req.body.username;
    const password: string = req.body.password;

    const data = await selectUser(username, password);
    const responseObject: loginResponseObject = {
      login_response: { username: data.username, outcome: data.outcome },
    };

    // errors handled here not in errors.ts as database returns nothing is expected if wrong username or password
    if (responseObject.login_response.outcome === "valid") {
      res.status(200).send(responseObject);
    } else if (responseObject.login_response.outcome === "invalid password") {
      res.status(400).send(responseObject);
    } else {
      res.status(404).send(responseObject);
    }
  } catch (error) {
    //move into err 500 next error handler if needed
    console.log(error);
  }
};

export const postNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUsername: string = req.body.username;
    const newPassword: string = req.body.password;

    const serverResponse = await createNewUser(newUsername, newPassword);
    const responseObject: registationResponseObject = {
      registration_response: serverResponse,
    };
    if (serverResponse.msg === "Registation successful.") {
      res.status(201).send(responseObject);
    }
  } catch (err) {
    next(err);
  }
};

export const getAllChars = async (req: Request, res: Response) => {
  try {
    const charData = await selectAllCharacters();
    const responseBody = { characters: charData };
    res.status(200).send(responseBody);
  } catch (err) {
    console.log(err);
  }
};
