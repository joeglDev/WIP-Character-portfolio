import selectUser from "../models/models-funcs";

const postLogin = async (req: any, res: any) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const data = await selectUser(username, password);
    const responseObject = { found_user : {username: data.username} };
    console.log(responseObject)
    res.status(200).send(responseObject);
  } catch (error) {
    throw error;
  }
};

export default postLogin;
