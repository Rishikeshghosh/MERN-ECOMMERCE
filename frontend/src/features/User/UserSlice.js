import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  updateUser,
  fetchLoggedInUserOrders,
  fetchLoggedInUser,
} from "./UserApi";

const initialState = {
  /* userOrders: [], */
  status: "idle",
  updateUser: null,
  userInfo: null,
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async () => {
    const response = await fetchLoggedInUserOrders(); //userId

    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async () => {
    const response = await fetchLoggedInUser();

    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "users/updateUser",

  async (update) => {
    const response = await updateUser(update);

    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.userInfo.orders = action.payload;

        /*  state.userOrders = action.payload; */
      })
      .addCase(updateUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.updateUser = action.payload;
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.updateUser = action.error;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.userInfo = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = userSlice.actions;

export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStaus = (state) => state.user.status;

export default userSlice.reducer;
