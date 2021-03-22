import { createSlice } from "@reduxjs/toolkit";

const { reducer, actions } = createSlice({
  name: "journals",
  initialState: [],
  reducers: {
    add: (state) => state,
    remove: (state) => state,
  },
});

export default reducer;
export const { add, remove } = actions;
