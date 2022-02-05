import { database } from "../../config/firebase";
import { ScorecardEntry } from "../../interfaces/scores";

// Fetch Single Score
export const fetchSingleScoreFunc = async (id: string) => {
  return await database.collection("scores").doc(id).get();
};

// Function to get scorecard data
export const fetchSingleScoreCardFunc = async (id: string) => {
  const snapShot = await database
    .collection("scores")
    .doc(id)
    .collection("scorecard")
    .get();
  return snapShot.docs.map((doc) => doc.data());
};

// Function to update scorecard data
export const updateSingleScoreCardFunc = async (
  id: string,
  data: ScorecardEntry[]
) => {
  console.log(data, id, "HELLO EMIL");
  return await database
    .collection("scores")
    .doc(id)
    .collection("scorecard")
    .doc("fX49ybMwZLTQbdEUm9Rq")
    .set({ ...data[0], putts: data[0].putts });
};
