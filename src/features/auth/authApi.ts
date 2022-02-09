import { database, auth } from "../../config/firebase";
import User from "../../interfaces/user";

export const getAdditionalUserInfo = async (
  collectionName: string,
  uid: string | undefined
) => {
  return await database.collection(collectionName).doc(uid).get();
};

// Get sal User-Infos
export const getUserData = async (id: string) => {
  return await database.collection("users").doc(id).get();
};

// Update Single User Data
export const updateUserDataFunc = async (data: User) => {
  database.collection("appUser").doc(data.id).update({
    name: data.name,
    hcp: data.hcp,
    url: data.url,
  });
};

// Delete Single User
export const deleteUserFunc = async (id: string) => {
  database.collection("appUser").doc(id).delete();
  auth.currentUser?.delete();
};
