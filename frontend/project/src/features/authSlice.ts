import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    }: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      confirm_password: string;
    },
    thunkAPI
  ) => {
    try {
      const url = "/api/register";

      const data = JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        confirm_password,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(url, data, config);

      if (response.status === 201) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error: any) {
      console.log(error);
      console.log(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const url = "/api/login";

      const data = JSON.stringify({ email, password });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(url, data, config);

      if (response.status === 200) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error: any) {
      console.log(error);
      console.log(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.registered = true;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetRegistered } = authSlice.actions;

export default authSlice.reducer;
