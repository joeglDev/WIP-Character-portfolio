import { db, client } from "../connection";
import userData from "../data/test/users";
import bcrypt from "bcrypt";
import { saltRounds } from "../../exports";

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
    }
  });

  //create collections
  const users = db.collection("users");
  console.log("Created collection: users");

  //insert users data
  const insertResult = await users.insertMany(hashedUserData);
  console.log('Inserted documents =>', insertResult);

  const filteredDocs = await users.find({}).toArray();
  console.log('Found documents  =>', filteredDocs);
  //await client.close()
  //return "done.";

  /*
  const test = bcrypt.compareSync("passwor",filteredDocs[0].password);
  console.log(test)
  */
};

seed();
//.then(console.log)
//.catch(console.error)
//.finally(() => client.close());
