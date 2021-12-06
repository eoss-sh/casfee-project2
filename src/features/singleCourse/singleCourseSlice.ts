import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import singelCourse, { hole } from "../../interfaces/course";
//[ToDo]: Rename the Function
import { getAdditionalUserInfo } from "../auth/authApi";
import { fetchHolesPerCourse } from "./courseAPI";

const initialState: singelCourse = {
  course: {
    name: "",
    shortDesc: "",
    desc: "",
    uid: "",
    url: "",
    type: "",
    total_distance1: 0,
    total_distance2: 0,
    total_distance3: 0,
    total_distance4: 0,
    par: 72,
    error: "",
    holes: [],
  },
};

// Func to fetch Single Course from Firestore
export const fetchCourse = createAsyncThunk(
  "course/fetchSingleCourse",
  async (uid: string) => {
    const result = await getAdditionalUserInfo("courses", uid);
    const holesResults = await fetchHolesPerCourse(uid);
    const holes = holesResults.docs.map((doc) => doc.data() as hole);
    const course = result.data();
    const courseData = { course, holes };
    return courseData;
  }
);

const courseReducer = createSlice({
  name: "course",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourse.fulfilled, (state: singelCourse, action) => {
        state.course = {
          name: action.payload.course?.name,
          shortDesc: action.payload.course?.shortDesc,
          desc: action.payload.course?.desc,
          url: action.payload.course?.url,
          type: action.payload.course?.type,
          uid: action.payload.course?.uid,
          par: action.payload.course?.par,
          total_distance1: action.payload.course?.total_distance1,
          total_distance2: action.payload.course?.total_distance2,
          total_distance3: action.payload.course?.total_distance3,
          total_distance4: action.payload.course?.total_distance4,
          error: "",
          holes: [...action.payload.holes],
        };
      })
      .addCase(fetchCourse.rejected, (state: singelCourse) => {
        state.course = {
          name: "",
          shortDesc: "",
          desc: "",
          url: "",
          type: "",
          uid: "",
          par: 0,
          error: "Could not fetch Course",
          holes: [],
        };
      })
      .addCase(fetchCourse.pending, (state: singelCourse) => {
        state.course = {
          name: "",
          shortDesc: "",
          desc: "",
          url: "",
          type: "",
          uid: "",
          par: 0,
          error: "Still pending",
          holes: [],
        };
      });
  },
});

export default courseReducer.reducer;
