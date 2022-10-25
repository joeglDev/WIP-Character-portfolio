import { db } from "../db/connection";
//this is the issue it has not run seed again each time so db undefined
//may fix on extract out
//this needs to be defined from a connection
import bcrypt from "bcrypt";
import { saltRounds } from "../exports";
import charsData from "../db/data/test/chars";

const users = db.collection("users");
const chars = db.collection("chars");

export const selectUser = async (username: string, password: string) => {
  const userData = await users.find({ username: username }).toArray();

  //user not found
  if (userData.length === 0) {
    return { username: "invalid_username", outcome: "user not found" };
  }
  // valid username and password
  else if (bcrypt.compareSync(password, userData[0].password)) {
    const foundUser = { username: userData[0].username, outcome: "valid" };
    return foundUser;
  }
  // user valid / invalid password
  else if (bcrypt.compareSync(password, userData[0].password) === false) {
    return { username: userData[0].username, outcome: "invalid password" };
  } else {
    throw new Error("unhandled login error");
  }
};

export const createNewUser = async (
  newUsername: string,
  newPassword: string
) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);

  //query db for existing username-> throw err if duplicate
  const foundUsername = await users.find({ username: newUsername }).toArray();
  if (foundUsername.length != 0) {
    return Promise.reject({
      username: newUsername,
      msg: "400-duplicate username",
    });
  } else {
    //valid new user
    const newUser = await users.insertOne({
      username: newUsername,
      password: hashedPassword,
    });
    if (newUser.acknowledged === true) {
      const validServerResponse = {
        username: newUsername,
        msg: "Registation successful.",
      };
      return validServerResponse;
    } else {
      const invalidServerResponse = {
        username: newUsername,
        msg: "Registation not successful.",
      };
      return invalidServerResponse;
    }
  }
};

export const selectAllCharacters = async () => {
  const charData = await chars.find({}).toArray();
  return charData
};

export const selectUserCharacters = async (username: string) => {
  const charData = await chars.find({ownerUsername: username}).toArray();
  return charData
};
