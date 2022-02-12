import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import coursesReducer from "../features/Courses/coursesSlice";
import courseReducer from "../features/SingleCourse/singleCourseSlice";
import singleScoreReducer from "../features/SingelScore/singleScoreSlice";
import scoresReducer from "../features/Scores/scoresSlice";
import allUserReducer from "../features/AllUser/allUserSlice";

const reducers = combineReducers({
  auth: authReducer,
  courses: coursesReducer,
  course: courseReducer,
  singleScore: singleScoreReducer,
  scores: scoresReducer,
  allUser: allUserReducer,
});

export default reducers;
