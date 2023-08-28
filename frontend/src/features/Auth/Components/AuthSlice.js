import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  LoginUser,
  createUser,
  signOutUser,
  checkAuth,
  resetPasswordRequest,
  resetPassword,
} from "./AuthApi";

const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null,
  signupError: null,
  userChecked: false,
  mailSent: false,
  resetPasswordStatus: false,
  resetPasswordError: null,
};

export const resetPasswordRequestAsync = createAsyncThunk(
  "users/resetPasswordRequest",
  async (email, { rejectWithValue }) => {
    try {
      const response = await resetPasswordRequest(email);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "users/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await LoginUser(loginInfo);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkAuthAsync = createAsyncThunk("users/checkAuth", async () => {
  try {
    const response = await checkAuth();
    return response.data;
  } catch (error) {}
});

export const createUserAsync = createAsyncThunk(
  "users/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await createUser(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signOutUserAsync = createAsyncThunk(
  "users/signOutUser",
  async (userId) => {
    const response = await signOutUser(userId);

    return response.data;
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "users/resetPasword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPassword(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const ProductListSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
      state.signupError = null;
      state.mailSent = false;
      state.resetPasswordStatus = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "idle";

        state.signupError = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(signOutUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signOutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.userChecked = true;
      })
      .addCase(resetPasswordRequestAsync.pending, (state, action) => {
        state.status = "loading";
        state.mailSent = false;
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.mailSent = true;
      })
      .addCase(checkAuthAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = true;
      })
      .addCase(resetPasswordAsync.pending, (state, action) => {
        state.status = "loading";
        state.resetPasswordStatus = false;
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.resetPasswordStatus = true;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = "idle";
        state.resetPasswordError = false;
      });
  },
});

export const { clearError } = ProductListSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export const selectSignupError = (state) => state.auth.signupError;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectMailSent = (state) => state.auth.mailSent;
export const selectResetPasswordError = (state) =>
  state.auth.resetPasswordError;
export const selectResetPasswordStatus = (state) =>
  state.auth.resetPasswordStatus;

export default ProductListSlice.reducer;
