import { database } from "../../config/firebase";
import User from "../../interfaces/user";

// Get all Users
export const getAllUserFunc = async () => {
  const data = await database.collection("appUser").get();
  const users = data.docs.map((doc) => {
    const data = doc.data() as User;
    const id = doc.id;
    return { ...data, id } as User;
  });
  return users;
};
