import { db } from "../db/connection";
//this is the issue it has not run seed again each time so db undefined
//may fix on extract out
//this needs to be defined from a connection
import bcrypt from "bcrypt";

const users = db.collection("users");

const selectUser = async (username:string, password:string) => {

    const userData = await users.find({username: username}).toArray();
    console.log("userdata", userData);
    
     //user not found
     if (userData.length === 0) {
        return {username: "invalid_username", outcome: "user not found"}
    }
    // valid username and password
    else if (bcrypt.compareSync(password, userData[0].password)) {
        const foundUser = {username: userData[0].username, outcome: "valid"};
        return foundUser
    } 
    // user valid / invalid password
    else if (bcrypt.compareSync(password, userData[0].password) === false) {
        return {username: userData[0].username, outcome: "invalid password"}
    } 
   
    else {
        throw new Error("unhandled login error")
    }

    
};

export default selectUser;