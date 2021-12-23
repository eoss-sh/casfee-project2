import { database } from "../../config/firebase";

// Fetch Single Score
export const fetchSingleScoreFunc = async (id: string) => {
  return await database.collection("scores").doc(id).get();
};

export const fetchSingleScoreCardFunc = async (id: string) => {
  const snapShot = await database
    .collection("scores")
    .doc(id)
    .collection("scorecard")
    .get();
  return snapShot.docs.map((doc) => doc.data());
};
