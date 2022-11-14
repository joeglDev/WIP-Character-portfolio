import {
  createNewUser,
  modelDelUserCharacter,
  selectAllCharacters,
  selectUser,
  selectUserCharacters,
  updateCharacter,
  writeNewUserCharacter,
} from "../models/models-funcs";
import { Request, Response, NextFunction } from "express";

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

export const getUserChars = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const charData = await selectUserCharacters(username);
    const responseBody = { user_characters: charData };
    res.status(200).send(responseBody);
  } catch (err) {
    console.log(err);
  }
};

export const postNewUserCharacter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = req.params.username;
  const newCharacter = req.body.new_character;
  try {
    const modelWrite = await writeNewUserCharacter(username, newCharacter);
    const responseBody = { character_created: modelWrite[0] };
    res.status(201).send(responseBody);
  } catch (err) {
    next(err);
  }
};

export const controllerDelUserCharacter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const deletedChar = await modelDelUserCharacter(id);
    const responseBody = { deleted_character: deletedChar };
    res.status(200).send(responseBody);
  } catch (err) {
    next(err);
  }
};

export const patchCharacter = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const patchedCharacter = await updateCharacter(id, data);
    const responseBody = { updated_character: patchedCharacter };
    res.status(200).send(responseBody);
  } catch (err) {
    console.log(err);
  }
};
