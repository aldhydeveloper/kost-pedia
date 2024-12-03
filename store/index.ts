import { configureStore } from "@reduxjs/toolkit";
import showSearchSlice from "./slices/showSearchSlice";

export const store = configureStore({
  reducer: {
    showSearch: showSearchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
