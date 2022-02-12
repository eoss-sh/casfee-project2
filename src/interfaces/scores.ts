export default interface Score {
  score: {
    id?: string;
    course?: string;
    score?: number;
    totalPutts?: number;
    totalFIR?: number;
    totalGIR?: number;
    date?: any;
    appUser?: string;
    scorecard: ScorecardEntry[];
  };
}

export interface Scores {
  scores: ScoreOverview[];
  averageScore: number;
  averagePutts: number;
  averageGIR: number;
  averageFIR: number;
  error: string;
  loading: boolean;
}

export interface ScorecardEntry {
  id?: string;
  holeNo?: number;
  putts?: number;
  score?: number;
  gir?: boolean;
  fir?: boolean;
}

export interface ScoreOverview {
  id?: string;
  course?: string;
  score: number;
  date?: any;
  appUser: string;
  totalPutts: number;
  totalFIR: number;
  totalGIR: number;
}

export interface ScoreInputsInterface {
  [key: string]: ScorecardEntry;
}
