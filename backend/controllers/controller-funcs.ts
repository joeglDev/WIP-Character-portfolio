import selectUser from "../models/models-funcs";

const postLogin = async (req: any, res: any) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const data = await selectUser(username, password);
    const responseObject = { login_response : {username: data.username, outcome: data.outcome} };
    console.log(responseObject)
    if (responseObject.login_response.outcome === "valid") {
    res.status(200).send(responseObject);
  } else if (responseObject.login_response.outcome === "invalid password") {
    res.status(400).send(responseObject);
  } else {
    res.status(404).send(responseObject);
  }
  } catch (error) {
    throw error;
  }
};

export default postLogin;
