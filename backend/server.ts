//import express = require("express");
import express from "express";
import {postLogin, postNewUser} from "./controllers/controller-funcs";
import Endpoints from "./Endpoints";
import { handleCustomErrors } from "./errors";

const app = express();
const port = 9124;

//middleware
app.use(express.json());

//paths
app.post(Endpoints.login, postLogin);
app.post(Endpoints.register, postNewUser)

//error handling
app.use(handleCustomErrors)

//listen
app.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
});

export default app;