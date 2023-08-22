import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction, PayloadActionCreator } from "@reduxjs/toolkit";
import { IUser } from "./utils";
import { handleApiError } from "@/utils/hanldeApiError";
// import httpCommon from '@/services/httpCommon'
// import { LoginValues } from '@/layout/forms/login/utils'
import { URLS } from "@/utils/URLS";
import { toast } from "react-toastify";

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  user: IUser | null;
}

const initialState: AuthState = {
  isLoading: false,
  isLoggedIn: false,
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<{
        user: IUser;
        token: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    toggleLoading: (state, action: PayloadAction<{ data: boolean }>) => {
      state.isLoading = action.payload.data;
    },
    logoutAction: (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginUser, toggleLoading, logoutAction } = authSlice.actions;

export default authSlice.reducer;
