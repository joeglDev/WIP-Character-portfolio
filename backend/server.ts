//import express = require("express");
import express from "express";
import cors from "cors";
import { controllerDelUserCharacter, getAllChars, getRoute, getUserChars, patchCharacter, postLogin, postNewUser, postNewUserCharacter } from "./controllers/controller-funcs";
import Endpoints from "./Endpoints";
import { handleCustomErrors, handleInvalidPaths } from "./errors";

const app = express();
const port = 9124 || process.env.PORT;//const {port = 9124} = process.env; 

//middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

//paths
app.get(Endpoints.route, getRoute)
app.post(Endpoints.login, postLogin);
app.post(Endpoints.register, postNewUser);
app.get(Endpoints.charactersEnd, getAllChars);
app.get(Endpoints.userCharactersEnd, getUserChars);
app.post(Endpoints.userCharactersEnd, postNewUserCharacter);
app.delete(Endpoints.specificUserCharacterEnd, controllerDelUserCharacter);
app.patch(Endpoints.specificUserCharacterEnd, patchCharacter);

//error handling
app.get(Endpoints.invalidEnd, handleInvalidPaths);
app.use(handleCustomErrors);

//listen
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}.`);
});

export default app;
