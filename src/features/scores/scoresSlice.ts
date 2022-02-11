import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMultiScoresFunc } from "./scoresApi";
import { Scores } from "../../interfaces/scores";
import logging from "../../config/logging";

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
  averageGIR: 0,
  averageFIR: 0,
  error: "",
  loading: false,
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
      const totalGIR = scores.reduce((acc, curr) => acc + curr.totalGIR, 0);
      const totalFIR = scores.reduce((acc, curr) => acc + curr.totalFIR, 0);
      const averageScore = Math.floor((totalScore / scores.length) * 100) / 100;
      const averagePutts = Math.floor((totalPutts / scores.length) * 100) / 100;
      const averageFIR = Math.floor((totalFIR / scores.length) * 100) / 100;
      const averageGIR = Math.floor((totalGIR / scores.length) * 100) / 100;
      state.averageScore = averageScore;
      state.averagePutts = averagePutts;
      state.averageGIR = averageGIR;
      state.averageFIR = averageFIR;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMultiScores.fulfilled, (state, action) => {
        state.scores = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchMultiScores.rejected, (state, action) => {
        state.scores = [];
        logging.error(action.error);
        state.loading = false;
      })
      .addCase(fetchMultiScores.pending, (state) => {
        state.loading = true;
        state.scores = [];
      });
  },
});

export const { calcAverage } = scoresReducer.actions;
export default scoresReducer.reducer;
