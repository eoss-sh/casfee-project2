import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMultiScoresFunc } from "./scoresApi";
import { Scores } from "../../interfaces/scores";

interface fetchData {
  attribute: string;
  id: string | undefined;
}

const initialState: Scores = {
  scores: [],
};

// Fetches multiple scores, all scores per user or all scores per course
export const fetchMultiScores = createAsyncThunk(
  "score/fetchMultiScores",
  async (fetchData: fetchData) => {
    const { attribute, id } = fetchData;
    const result = await fetchMultiScoresFunc(attribute, id);
    return result;
  }
);

const scoresReducer = createSlice({
  name: "scores",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMultiScores.fulfilled, (state, action) => {
      state.scores = action.payload;
    });
  },
});

export default scoresReducer.reducer;
