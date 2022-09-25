import express from "express";
const app = express();
const port = 9124;

//paths

//listen
app.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
});

export default app;