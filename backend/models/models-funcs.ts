import { db } from "../db/seeds/seed-test";
//this needs to be defined from a connection
const users = db.collection("users");

const selectUser = async (username:string, password:string) => {

    const userData = await users .find({username: username}).toArray();
    return userData[0]
};

export default selectUser;