import { db } from "../db/seeds/seed-test";
//this needs to be defined from a connection
const users = db.collection("users");

const selectUser = async (username:string, password:string) => {

    const userData = await users.find({username: username}).toArray();
    
    console.log("userdata", userData);
    
     //user not found
     if (userData.length === 0) {
        return {username: "invalid_username", outcome: "user not found"}
    }
    // valid username and password
    else if (password === userData[0].password) {
        const foundUser = {username: userData[0].username, outcome: "valid"};
        return foundUser
    } 
    // user valid / invalid password
    else if (password !== userData[0].password) {
        return {username: userData[0].username, outcome: "invalid password"}
    } 
   
    else {
        throw new Error("unhandled login error")
    }
    //console.log("model, foundUser")
    
};

export default selectUser;