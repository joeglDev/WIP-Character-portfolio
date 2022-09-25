import selectUser from "../models/models-funcs";


const postLogin = (req:any, res:any) => {
  
  try {
    console.log(req.body)
    const username = req.body.username;
    const password = req.body.password;

  const data = selectUser(username, password);
  console.log(data)
  } catch (error) {
    throw error;
  }

   
    

};

export default postLogin;