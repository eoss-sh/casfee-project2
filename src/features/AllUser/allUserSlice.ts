import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import logging from "../../config/logging";
import { getAllUserFunc } from "./allUserApi";
import { Users } from "../../interfaces/user";

const initialState: Users = {
  users: [],
};

// Thunk to get all Users
export const getAllUsers = createAsyncThunk("allUser/getAllUsers", async () => {
  try {
    return await getAllUserFunc();
  } catch (error) {
    logging.error(error);
  }
});

const allUserSlice = createSlice({
  name: "allUser",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.fulfilled, (state: Users, action) => {
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state: Users, action) => {
        logging.error(action.payload);
      });
  },
});

export default allUserSlice.reducer;
