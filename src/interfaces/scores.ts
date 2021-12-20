export default interface Score {
  score: {
    id?: string;
    course?: string;
    score?: number;
    date?: string;
    user?: string;
    scorecard?: ScorecardEntry[];
  };
}

export interface Scores {
  scores: ScoreOverview[];
}

export interface ScorecardEntry {
  id?: string;
  holeNo?: number;
  putts?: number;
  score?: number;
}

export interface ScoreOverview {
  id?: string;
  course?: string;
  score?: number;
  date?: string;
  user?: string;
}
