import express from "express";
import getLogin from "./controllers/controller-funcs.js";
import Endpoints from "./Endpoints.js";

const app = express();
const port = 9124;

//middleware
app.use(express.json());

//paths
app.get(Endpoints.getLogin, getLogin)

//listen
app.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
});

export default app;