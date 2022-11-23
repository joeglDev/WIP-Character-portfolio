//note- production will need a seed with collections but no data
import { MongoClient } from "mongodb";
import dotenv from "dotenv";


// Connection URL
export let client: any;
export let db: any;


const ENV = process.env.NODE_ENV || "development";
console.log("Environment: ", ENV);
dotenv.config();

if (ENV === "test" || ENV === "development") {
  client = new MongoClient(`${process.env.MONGODB_URI}`);
  // Database Name
  const dbName = "char-portfolio-test";
  db = client.db(dbName);
} else if (ENV === "production") {
  client = new MongoClient(`${process.env.MONGODB_URI}`); //this will likely need changing
  // Database Name
  const dbName = "char-portfolio-prod";
  db = client.db(dbName);
};

