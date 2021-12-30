import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMultiScoresFunc } from "./scoresApi";
import { Scores } from "../../interfaces/scores";

interface fetchData {
  attribute: string;
  id: string | undefined;
  order: string;
  limit: number;
  direction: string;
}

const initialState: Scores = {
  scores: [],
  averageScore: 0,
  averagePutts: 0,
};

// Fetches multiple scores, all scores per user or all scores per course
export const fetchMultiScores = createAsyncThunk(
  "score/fetchMultiScores",
  async (fetchData: fetchData) => {
    const { attribute, id, order, limit, direction } = fetchData;
    const result = await fetchMultiScoresFunc(
      attribute,
      id,
      order,
      limit,
      direction
    );
    return result;
  }
);

const scoresReducer = createSlice({
  name: "scores",
  initialState: initialState,
  reducers: {
    calcAverage: (state) => {
      const { scores } = state;
      const totalScore = scores.reduce((acc, curr) => acc + curr.score, 0);
      const totalPutts = scores.reduce((acc, curr) => acc + curr.totalPutts, 0);
      const averageScore = totalScore / scores.length;
      const averagePutts = totalPutts / scores.length;
      state.averageScore = averageScore;
      state.averagePutts = averagePutts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMultiScores.fulfilled, (state, action) => {
      state.scores = action.payload;
    });
    builder.addCase(fetchMultiScores.rejected, (state, action) => {
      state.scores = [];
      console.log(action.error);
    });
  },
});

export const { calcAverage } = scoresReducer.actions;
export default scoresReducer.reducer;
