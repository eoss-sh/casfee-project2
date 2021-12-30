export default interface Score {
  score: {
    id?: string;
    course?: string;
    score?: number;
    totalPutts?: number;
    date?: any;
    appUser?: string;
    scorecard?: ScorecardEntry[];
  };
}

export interface Scores {
  scores: ScoreOverview[];
  averageScore: number;
  averagePutts: number;
}

export interface ScorecardEntry {
  id?: string;
  holeNo?: number;
  putts?: number;
  score?: number;
  gir?: string;
  fairway?: string;
}

export interface ScoreOverview {
  id?: string;
  course?: string;
  score: number;
  date?: any;
  appUser: string;
  totalPutts: number;
}
