import { database } from "../../config/firebase";
import { ScoreOverview } from "../../interfaces/scores";

// Fetch all scores of a User or Course
export const fetchMultiScoresFunc = async (
  attribute: string,
  id: string | undefined
) => {
  const data = await database
    .collection("scores")
    .where(attribute, "==", id)
    .get();
  const scores = data.docs.map((doc) => {
    const data = doc.data();
    const id = doc.id;
    return { ...data, id } as ScoreOverview;
  });
  return scores;
};
