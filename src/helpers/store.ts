import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import coursesReducer from "../features/courses/coursesSlice";
import courseReducer from "../features/singleCourse/singleCourseSlice";
import singleScoreReducer from "../features/singelScore/singleScoreSlice";
import scoresReducer from "../features/scores/scoresSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    course: courseReducer,
    singleScore: singleScoreReducer,
    scores: scoresReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
