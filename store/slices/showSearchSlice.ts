import { createSlice } from "@reduxjs/toolkit";

interface iShowSearch {
  show: boolean;
}

const initialState: iShowSearch = {
  show: false,
};

const showSlice = createSlice({
  name: "showSearch",
  initialState,
  reducers: {
    show: (state) => {
      state.show = true;
    },
    hide: (state) => {
      state.show = false;
    },
  },
});

export const { show, hide } = showSlice.actions;
export default showSlice.reducer;
