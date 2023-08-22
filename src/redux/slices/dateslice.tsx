import { createSlice } from "@reduxjs/toolkit";

const dateslice = createSlice({
  name: "date",
  initialState: {
    start_date: "",
    end_date: "",
  },
  reducers: {
    setStartDate: (state, action) => {
      state.start_date = action.payload;
    },
    setEndDate: (state, action) => {
      state.end_date = action.payload;
    },
    setClear: (state) => {
      state.start_date = "";
      state.end_date = "";
    },
  },
});

export const { setStartDate, setEndDate, setClear } = dateslice.actions;
export default dateslice.reducer;
