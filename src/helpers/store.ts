import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import coursesReducer from "../features/Courses/coursesSlice";
import courseReducer from "../features/SingleCourse/singleCourseSlice";
import singleScoreReducer from "../features/SingelScore/singleScoreSlice";
import scoresReducer from "../features/Scores/scoresSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    course: courseReducer,
    singleScore: singleScoreReducer,
    scores: scoresReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
