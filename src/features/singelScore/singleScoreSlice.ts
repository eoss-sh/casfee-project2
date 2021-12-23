import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchSingleScoreFunc,
  fetchSingleScoreCardFunc,
} from "./singleScoresApi";
import Score from "../../interfaces/scores";
import logging from "../../config/logging";

const initialState: Score = {
  score: { id: "", course: "", score: 0, user: "", date: "", scorecard: [] },
};

// Fetches one single score with a specific ID
export const fetchSingleScore = createAsyncThunk(
  "singleScore/fetchSingleScore",
  async (id: string) => {
    const result = await fetchSingleScoreFunc(id);
    const score = result.data();
    const scorecard = await fetchSingleScoreCardFunc(id);
    const totalScore = { ...score, scorecard };
    return totalScore;
  }
);

const singelScoreReducer = createSlice({
  name: "singleScore",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleScore.fulfilled, (state: Score, action) => {
        logging.info("Fetched single score");
        logging.info(action.payload);
        state.score = action.payload;
      })
      .addCase(fetchSingleScore.rejected, (state: Score) => {
        logging.error("Fetching single score failed");
        state = initialState;
      })
      .addCase(fetchSingleScore.pending, (state: Score) => {
        logging.info("Fetching single score");
        state = initialState;
      });
  },
});

export default singelScoreReducer.reducer;
