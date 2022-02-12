import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import reducers from "./reducers";

const initialState =
  "Cypress" in window ? (window as any).__chr__initialState__ : undefined;

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

if ("Cypress" in window) {
  const w = window as any;
  w.__chr__store__ = store;
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
