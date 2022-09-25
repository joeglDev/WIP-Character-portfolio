import selectUsers from "../models/models-funcs.js";


const getLogin =  () => {
  
  const data = selectUsers();
  console.log(data)

   
    

};

export default getLogin;