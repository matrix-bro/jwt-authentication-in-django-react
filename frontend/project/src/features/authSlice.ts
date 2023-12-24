import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showAlert } from "./alertSlice";

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
        thunkAPI.dispatch(getUser());

        thunkAPI.dispatch(
          showAlert({ msg: "Login Successfull.", type: "success" })
        );

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

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const url = "/api/logout";
    const response = await axios.get(url);

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
});

export const verifyAuth = createAsyncThunk(
  "auth/verify",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/token/verify");

      if (response.status === 200) {
        thunkAPI.dispatch(getUser());

        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error: any) {
      // console.log(error);
      // console.log(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/users/me",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("api/users/me");

      if (response.status === 200) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error: any) {
      // console.log(error.response.data);
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
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      })
      .addCase(verifyAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyAuth.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetRegistered } = authSlice.actions;

export default authSlice.reducer;
