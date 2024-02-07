import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const general = createSlice({
  name: "general",
  initialState,
  reducers: {
    loadingEnable: (state) => {
      state.loading = true;
    },
    loadingDisable: (state) => {
      state.nodeInfo = false;
    },
  },
});

export const { loadingEnable, loadingDisable } = general.actions;
export default general.reducer;
