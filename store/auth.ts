import { createSlice } from "@reduxjs/toolkit";
type LoginResponse = {
  token: string;
  userEmaul: string;
  userName: string;
  id: string;
};

const initialState: Partial<LoginResponse> = {};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const authReducer = slice.reducer;
