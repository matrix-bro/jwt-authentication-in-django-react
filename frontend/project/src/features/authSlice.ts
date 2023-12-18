import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  } | null;
  loading: boolean;
  registered: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  registered: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false;
    },
  },
});

export const { resetRegistered } = authSlice.actions;

export default authSlice.reducer;
