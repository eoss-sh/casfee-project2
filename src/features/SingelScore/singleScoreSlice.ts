import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchSingleScoreFunc,
  fetchSingleScoreCardFunc,
  updateSingleScoreCardFunc,
  deleteSingleScoreFunc,
} from "./singleScoresApi";
import Score from "../../interfaces/scores";
import logging from "../../config/logging";
import { ScorecardEntry } from "../../interfaces/scores";

interface updateData {
  id: string;
  data: ScorecardEntry[];
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

// Updates one single score with a specific ID
export const updateSingleScore = createAsyncThunk(
  "singleScore/updateSingleScore",
  async (updateData: updateData) => {
    try {
      const { id, data } = updateData;
      const result = await updateSingleScoreCardFunc(id, data);
      return result;
    } catch (error) {
      return error;
    }
  }
);

// Deletes one single score with a specific ID
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
  reducers: {
    updateScore(state, action) {
      console.log(action.payload);
      state.score.scorecard[action.payload.index].putts = action.payload.value;
    },
  },
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
      .addCase(updateSingleScore.fulfilled, () => {
        logging.info("Updated single score");
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

export const { updateScore } = singelScoreReducer.actions;

export default singelScoreReducer.reducer;
