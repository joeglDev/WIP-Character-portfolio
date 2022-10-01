import selectUser from "../models/models-funcs";
import { Request, Response } from "express";

//objects
interface loginResponseObject {
  login_response: { username: string; outcome: string };
}

const postLogin = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const data = await selectUser(username, password);
    const responseObject: loginResponseObject = {
      login_response: { username: data.username, outcome: data.outcome },
    };
    console.log(responseObject);
    if (responseObject.login_response.outcome === "valid") {
      res.status(200).send(responseObject);
    } else if (responseObject.login_response.outcome === "invalid password") {
      res.status(400).send(responseObject);
    } else {
      res.status(404).send(responseObject);
    }
  } catch (error) {
    //move into err 500 next error handler if needed
    console.log(error)
  }
};

export default postLogin;
