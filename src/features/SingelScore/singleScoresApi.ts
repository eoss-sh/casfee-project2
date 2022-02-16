import { database } from "../../config/firebase";
import {
  ScorecardEntry,
  ScoreInputsInterface,
  ScoreTotals,
} from "../../interfaces/scores";
import logging from "../../config/logging";

// Fetch Single Score
export const fetchSingleScoreFunc = async (id: string) => {
  return await database.collection("scores").doc(id).get();
};

// Function to get scorecard data
export const fetchSingleScoreCardFunc = async (id: string) => {
  const data = await database
    .collection("scores")
    .doc(id)
    .collection("scorecard")
    .get();
  const sortedData = data.docs.sort((a, b) => {
    if (a.data().holeNo < b.data().holeNo) {
      return 1;
    }
    if (a.data().holeNo > b.data().holeNo) {
      return -1;
    }
    return 0;
  });
  return sortedData.map((doc) => {
    const data = doc.data();
    const id = doc.id;
    return { ...data, id } as ScorecardEntry;
  });
};

// Function to update scorecard data of single scorecard entry
export const updateSingleScoreCardFunc = async (
  id: string,
  data: ScorecardEntry
) => {
  await database
    .collection("scores")
    .doc(id)
    .collection("scorecard")
    .doc(data.id)
    .update(data);
  return data;
};

// Function to update score after scorecard entry has changed
export const updateScoreFunc = async (data: ScoreTotals) => {
  return await database.collection("scores").doc(data.id).set({
    score: data.score,
    totalPutts: data.totalPutts,
    totalFIR: data.totalFIR,
    totalGIR: data.totalGIR,
    appUser: data.appUser,
    course: data.course,
    date: data.date,
  });
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
