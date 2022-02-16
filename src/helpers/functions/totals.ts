import { ScorecardEntry, ScoreInputsInterface } from "../../interfaces/scores";

// Function to get Totals of different types of score
export const getTotalScore = (
  attribute: string,
  scorecard: ScoreInputsInterface | ScorecardEntry[]
) => {
  return Object.values(scorecard).reduce(
    (acc, hole: any) => acc + hole[attribute],
    0
  );
};

// Function to get Total of GIR an FIR
export const getTotalIR = (
  attribute: string,
  scorecard: ScoreInputsInterface | ScorecardEntry[]
) => {
  return Object.values(scorecard).filter(
    (hole: any) => hole[attribute] === true
  ).length;
};
