import {db, client} from "../connection";
import userData from "../data/test/users";

/*
//schemas
//import mongoose from "mongoose";
import { Schema } from "mongoose";
import test from "node:test";
var bcrypt = require("bcrypt-nodejs");


var userSchema = new Schema({
  username: String,
  password: String,
});

// hash the password
userSchema.methods.generateHash = function(password:string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password:string) {
  return bcrypt.compareSync(password, this.password);
};

//test creating a user obj
const HashedUser = mongoose.model('user', userSchema);
const testUser:any = new HashedUser({username: "test", password: "test"});
//test hashing password
testUser.password = testUser.generateHash(testUser.password);

console.log("test user", testUser)
//test decrypt password
const isValid = bcrypt.compareSync("password", testUser.password);
console.log("check valid password", isValid)
*/

export async function seed() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");

  //drop collections
  let list = await db.listCollections().toArray();
  await list.forEach(async (data: any) => {
    if (data.name === "users") {
      console.log("Dropping collection: users");
      await db.dropCollection("users");
    }
  });

  //create collections
  const users = db.collection("users");
  console.log("Created collection: users")

  //insert users data
  const insertResult = await users.insertMany(userData);
  //console.log('Inserted documents =>', insertResult);

  const filteredDocs = await users.find({}).toArray();
  //console.log('Found documents  =>', filteredDocs);
  //await client.close()
  //return "done.";
};

seed()
  //.then(console.log)
  //.catch(console.error)
  //.finally(() => client.close());
