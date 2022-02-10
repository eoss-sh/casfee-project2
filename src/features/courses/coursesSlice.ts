import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../config/firebase";
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
    const coursesCollection: singelCourse[] = [];
    const snapshot = await database.collection("courses").get();
    snapshot.forEach((doc) => {
      coursesCollection.push({
        course: {
          name: doc.data().name,
          shortDesc: doc.data().shortDesc,
          desc: doc.data().desc,
          type: doc.data().type,
          url: doc.data().url,
          par: doc.data().par,
          uid: doc.id,
          error: "",
        },
      });
    });
    return coursesCollection;
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
