//note- production will need a seed with collections but no data
import { MongoClient } from "mongodb";
import dotenv from "dotenv";


// Connection URL
export let client: any;
export let db: any;


const ENV = process.env.NODE_ENV || "test";
console.log(ENV);
dotenv.config();
if (ENV === "test") {
  client = new MongoClient(`${process.env.MONGODB_URL}`);
  // Database Name
  const dbName = "char-portfolio-test";
  db = client.db(dbName);
};

