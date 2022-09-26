//note- production will need a seed with collections but no data
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import userData from "../data/test/users";

// Connection URL
let client:any;
const ENV = process.env.NODE_ENV || "test";
console.log(ENV)
dotenv.config();
if (ENV === "test") {
client = new MongoClient(`${process.env.MONGODB_URL}`);
};


//schemas
import mongoose from "mongoose";
import {Schema} from "mongoose";
import test from "node:test";
var bcrypt = require('bcrypt-nodejs');

/*
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



// Database Name
const dbName = "char-portfolio-test";
export const db = client.db(dbName);



async function seed() {
  
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
 

  //drop collections
  await  db.dropCollection("users")
 
  //create collections
  const users = db.collection("users");


  //insert users data
  const insertResult = await users.insertMany(userData);
  //console.log('Inserted documents =>', insertResult);

  const filteredDocs = await users.find({}).toArray();
//console.log('Found documents  =>', filteredDocs);


  return "done.";
  
}

seed()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

  export default seed;



