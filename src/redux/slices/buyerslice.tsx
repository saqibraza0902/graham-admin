import { createSlice } from "@reduxjs/toolkit";

const buyerslice = createSlice({
  name: "buyerId",
  initialState: "",
  reducers: {
    buyerId: (state, action) => {
      return action.payload;
    },
  },
});

export const { buyerId } = buyerslice.actions;
export default buyerslice.reducer;
