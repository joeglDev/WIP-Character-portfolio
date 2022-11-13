//import express = require("express");
import express from "express";
import cors from "cors";
import { getAllChars, getUserChars, postLogin, postNewUser, postNewUserCharacter } from "./controllers/controller-funcs";
import Endpoints from "./Endpoints";
import { handleCustomErrors, handleInvalidPaths } from "./errors";

const app = express();
const port = 9124;

//middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

//paths
app.post(Endpoints.login, postLogin);
app.post(Endpoints.register, postNewUser);
app.get(Endpoints.charactersEnd, getAllChars);
app.get(Endpoints.userCharactersEnd, getUserChars);
app.post(Endpoints.userCharactersEnd, postNewUserCharacter);

//error handling
app.get(Endpoints.invalidEnd, handleInvalidPaths);
app.use(handleCustomErrors);

//listen
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

export default app;
