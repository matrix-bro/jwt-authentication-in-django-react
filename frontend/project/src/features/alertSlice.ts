import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const showAlert = createAsyncThunk(
  "alert/show",
  async ({ msg, type }: { msg: string; type: string }, thunkAPI) => {
    thunkAPI.dispatch(setAlert({ msg, type }));
    setTimeout(() => {
      thunkAPI.dispatch(removeAlert());
    }, 4000);
  }
);

const initialState = {
  msg: null,
  type: null,
};

const alert = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.msg = action.payload.msg;
      state.type = action.payload.type;
    },
    removeAlert: (state) => {
      state.msg = null;
      state.type = null;
    },
  },
});

export const { setAlert, removeAlert } = alert.actions;

export default alert.reducer;
