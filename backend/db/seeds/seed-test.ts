//note- production will need a seed with collections but no data
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import userData from "../data/test/users";

// Connection URL
let client:any;
const ENV = process.env.NODE_ENV || "test";
dotenv.config();
if (ENV === "test") {
client = new MongoClient(`${process.env.MONGODB_URL}`);
};

// Database Name
const dbName = "char-portfolio-test";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);

  //drop collections
  await  db.dropCollection("users")
 
  //create collections
  const users = db.collection("users");

  //insert users data
  const insertResult = await users.insertMany(userData);
  //console.log('Inserted documents =>', insertResult);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());


