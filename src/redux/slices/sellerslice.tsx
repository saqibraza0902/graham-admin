import { createSlice } from "@reduxjs/toolkit";

const sellerslice = createSlice({
  name: "id",
  initialState: "",
  reducers: {
    setSellerID: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSellerID } = sellerslice.actions;
export default sellerslice.reducer;
