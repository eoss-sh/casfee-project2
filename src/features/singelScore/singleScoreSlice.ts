import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchSingleScoreFunc,
  fetchSingleScoreCardFunc,
  updateSingleScoreCardFunc,
  deleteSingleScoreFunc,
  updateScoreFunc,
} from "./singleScoresApi";
import { getTotalIR, getTotalScore } from "../../helpers/functions/totals";
import Score from "../../interfaces/scores";
import logging from "../../config/logging";
import { ScorecardEntry } from "../../interfaces/scores";

interface updateData {
  id: string;
  data: ScorecardEntry;
}

const initialState: Score = {
  score: {
    id: "",
    course: "",
    score: 0,
    appUser: "",
    date: new Date(),
    scorecard: [],
  },
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

// Updates one single score entry with a specific ID
export const updateSingleScoreEntry = createAsyncThunk(
  "singleScore/updateSingleScoreEntry",
  async (updateData: updateData) => {
    const { id, data } = updateData;
    const result = await updateSingleScoreCardFunc(id, data);
    return result;
  }
);

// Update one score header with a specific ID
export const updateSingleScore = createAsyncThunk(
  "singleScore/updateSingleScore",
  async (id: string) => {
    const result = await fetchSingleScoreFunc(id);
    const data = result.data();
    const currentScoreCardData = await fetchSingleScoreCardFunc(id);
    const newData = {
      id: id,
      score: getTotalScore("score", currentScoreCardData),
      totalPutts: getTotalScore("putts", currentScoreCardData),
      totalGIR: getTotalIR("gir", currentScoreCardData),
      totalFIR: getTotalIR("fir", currentScoreCardData),
      appUser: data?.appUser,
      course: data?.course,
      date: data?.date,
    };
    console.log(newData);
    await updateScoreFunc(newData);
    return newData;
  }
);

// Thunk to delete User
export const deleteSingleScore = createAsyncThunk(
  "singleScore/deleteSingleScore",
  async (id: string | undefined) => {
    try {
      typeof id !== "string"
        ? logging.error("NO ID GIVEN")
        : await deleteSingleScoreFunc(id);

      return "Score deleted";
    } catch (error) {
      logging.error(error);
    }
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
      })
      .addCase(updateSingleScoreEntry.fulfilled, (state: Score, action) => {
        logging.info("Updated single score");
        state.score.scorecard[
          state.score.scorecard.findIndex((x) => x.id === action.payload.id)
        ] = action.payload;
      })
      .addCase(updateSingleScoreEntry.rejected, (action) => {
        logging.error("Updating single score failed");
      })
      .addCase(updateSingleScore.fulfilled, (state: Score, action) => {
        state.score.score = action.payload.score;
        state.score.totalPutts = action.payload.totalPutts;
        state.score.totalGIR = action.payload.totalGIR;
        state.score.totalFIR = action.payload.totalFIR;
      })
      .addCase(updateSingleScore.rejected, (action) => {
        logging.error("Updating single score failed");
      })
      .addCase(deleteSingleScore.fulfilled, (state: Score) => {
        logging.info("Deleted single score");
        state = initialState;
      })
      .addCase(deleteSingleScore.rejected, (state: Score) => {
        logging.error("Deleting single score failed");
      });
  },
});

export default singelScoreReducer.reducer;
