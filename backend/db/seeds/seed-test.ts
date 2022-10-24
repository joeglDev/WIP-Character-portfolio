import { db, client } from "../connection";
import userData from "../data/test/users";
import bcrypt from "bcrypt";
import { saltRounds } from "../../exports";
import charsData from "../data/test/chars";

export async function seed() {

  //hash password data for testing
  const hashedCopyOfUserData = userData.map(async ({ ...user }) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(user.password, salt);
    return {username: user.username, password: hash}
  });
  const hashedUserData = await Promise.all(hashedCopyOfUserData);

  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");

  //drop collections
  let list = await db.listCollections().toArray();
  await list.forEach(async (data: any) => {
    if (data.name === "users") {
      console.log("Dropping collection: users");
      await db.dropCollection("users");
    } else if (data.name === "chars") {
      console.log("Dropping collection: chars");
      await db.dropCollection("chars");
    }
  });

  //create collections
  const users = db.collection("users");
  const chars = db.collection("chars")
  console.log("Created collection: users");
  console.log("Created collection: chars");

  //insert data
  const insertUsers = await users.insertMany(hashedUserData);
  console.log('Inserted documents =>', insertUsers);

  const insertChars = await chars.insertMany(charsData);
  console.log('Inserted documents =>', insertChars);

  const filteredDocs = await chars.find({}).toArray();
  console.log('Found documents  =>', filteredDocs);
  await client.close()
};

seed();
//.then(console.log)
//.catch(console.error)
//.finally(() => client.close());
