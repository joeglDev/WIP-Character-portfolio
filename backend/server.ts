import express from "express";
const app = express();
const port = 9090;


//listen
app.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
})