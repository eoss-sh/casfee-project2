import { database } from "../../config/firebase";
import User from "../../interfaces/user";

// Get all Users
export const getAllUserFunc = async () => {
  const data = await database.collection("users").get();
  const users = data.docs.map((doc) => {
    return doc.data() as User;
  });
  return users;
};
