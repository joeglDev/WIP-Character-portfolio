import { db } from "../db/connection";
const users = db.collection("users");

export const doesUserExist = async (username: string) => {
    const userData = await users.find({ username: username }).toArray();
    if (userData.length === 0) {
        return false
    } else return true
};