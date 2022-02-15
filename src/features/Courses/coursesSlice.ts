import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchCoursesFunc from "./coursesApi";
import singelCourse from "../../interfaces/course";

interface coursesState {
  courses: singelCourse[];
  loading: boolean;
}

const initialState: coursesState = {
  courses: [],
  loading: false,
};

// Func to fetch all Courses from Firestore
export const fetchCoursesList = createAsyncThunk(
  "courses/fetchListOfCourses",
  async () => {
    return await fetchCoursesFunc();
  }
);

const coursesReducer = createSlice({
  name: "courses",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoursesList.fulfilled, (state: coursesState, action) => {
        state.courses = action.payload;
        state.loading = false;
      })
      .addCase(fetchCoursesList.rejected, (state: coursesState) => {
        state = {
          courses: [],
          loading: false,
        };
      })
      .addCase(fetchCoursesList.pending, (state: coursesState) => {
        state.loading = true;
      });
  },
});

export default coursesReducer.reducer;
