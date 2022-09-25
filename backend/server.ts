import express from "express";
import postLogin from "./controllers/controller-funcs.js";
import Endpoints from "./Endpoints.js";

const app = express();
const port = 9124;

//middleware
app.use(express.json());

//paths
app.post(Endpoints.postLogin, postLogin)

//listen
app.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
});

export default app;