import { db } from "../db/connection";
//this is the issue it has not run seed again each time so db undefined
//may fix on extract out
//this needs to be defined from a connection
import bcrypt from "bcrypt";
import { saltRounds } from "../exports";
import { doesUserExist } from "./utils";

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
  return charData;
};

export const selectUserCharacters = async (username: string) => {
  const charData = await chars.find({ ownerUsername: username }).toArray();
  return charData;
};

//returns newly inserted character if
//has name and ownerUsername properties
// ownerUsername is a registered user
//insert is successful
export const writeNewUserCharacter = async (
  username: string,
  newCharacter: any
) => {
  try {
    const {
      ownerUsername,
      name,
      age,
      species,
      gender,
      sexuality,
      allignment,
      height,
      weight,
      imgURL,
      bio,
    } = newCharacter;
    if (
      ownerUsername === undefined ||
      name === undefined ||
      ownerUsername === "" ||
      name === ""
    ) {
      return Promise.reject({
        username: username,
        msg: "400-invalid response body",
      });
    } else {
      //call func to find users
      const checkUser = await doesUserExist(username);
      if (!checkUser) {
        return Promise.reject({
          status: 404,
          username: username,
          msg: "404-user not found",
        });
      } else {
        //if insert successful
        const newCharInsert = (await chars.insertOne(newCharacter));
        if (
          newCharInsert.acknowledged === true &&
          newCharInsert.hasOwnProperty("insertedId")
        ) {
          const newChar = await chars.findOne({_id: newCharInsert.insertedId});
          return newChar;
        }
      }
    }
  } catch (err) {}
};

export const modelDelUserCharacter = async (id: string) => {
  const ObjectID = require("mongodb").ObjectID;
  var mongodb = require("mongodb");
  // grab char data before delete to return
  const char = await chars.findOne(ObjectID(id));
  if (char === null) {
    return Promise.reject({ id: id, msg: "404-character not found" });
  }
  const deletedCharacter = await chars.deleteOne({
    _id: new mongodb.ObjectID(id),
  });
  if (
    deletedCharacter.acknowledged === true &&
    deletedCharacter.deletedCount === 1
  ) {
    return char;
  }
};

export const updateCharacter = async (id: string, data: any) => {
  try {
    const ObjectID = require("mongodb").ObjectID;
    //extract this out to a util func
    const isFound = await chars.findOne(ObjectID(id));
    if (isFound === null) {
      return Promise.reject({ id: id, msg: "404-character not found" });
    }

    const update = await chars.update({ _id: ObjectID(id) }, { $set: data });
    const changedValue = await chars.findOne(ObjectID(id));
    if (update.acknowledged === true && update.modifiedCount === 1) {
      return changedValue;
    }
  } catch (err) {
    // console.log(err);
  }
};
