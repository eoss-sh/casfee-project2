import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import logging from "../../config/logging";
import { getAllUserFunc } from "./allUserApi";
import { Users } from "../../interfaces/user";

const initialState: Users = {
  users: [],
};

// Thunk to get all Users
export const fetchAllUsers = createAsyncThunk(
  "allUser/getAllUsers",
  async () => {
    return await getAllUserFunc();
  }
);

const allUserSlice = createSlice({
  name: "allUser",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        logging.error(action.payload);
      });
  },
});

export default allUserSlice.reducer;
