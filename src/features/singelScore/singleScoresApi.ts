import { database } from "../../config/firebase";
import { ScorecardEntry, ScoreInputsInterface } from "../../interfaces/scores";
import logging from "../../config/logging";

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
  return await database
    .collection("scores")
    .doc(id)
    .collection("scorecard")
    .doc("fX49ybMwZLTQbdEUm9Rq")
    .set({ ...data[0], putts: data[0].putts });
};

// Function to add socrecard data
export const addScore = async (
  course: string,
  appUser: string | undefined,
  totalScore: number,
  totalPutts: number,
  totalGIR: number,
  totalFIR: number,
  scorecard: ScoreInputsInterface
) => {
  const date = new Date();
  const score = {
    date: date,
    course: course,
    appUser: appUser,
    score: totalScore,
    totalPutts: totalPutts,
    totalGIR: totalGIR,
    totalFIR: totalFIR,
  };
  try {
    const result = await database.collection("scores").add(score);
    for (let [no, score] of Object.entries(scorecard)) {
      await database
        .collection("scores")
        .doc(result.id)
        .collection("scorecard")
        .add({ ...score, holeNo: parseInt(no, 10) });
    }
    window.localStorage.setItem("scorecard", "{}");
  } catch (error) {
    logging.error(error);
  }
};

// Function to delete socrecard data
export const deleteSingleScoreFunc = async (id: string) => {
  database.collection("scores").doc(id).delete();
};
