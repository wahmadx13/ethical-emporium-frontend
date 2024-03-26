import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CognitoIdTokenPayload } from "aws-jwt-verify/jwt-model";
import { signIn, signOut, type SignInInput } from "aws-amplify/auth";
import { IAuthInitialState } from "@/redux/@types/auth";

const initialState: IAuthInitialState = {
  user: null,
  jwtToken: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  error: null,
};

//Login user
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: SignInInput, thunkApi) => {
    try {
      return await signIn({ username, password });
    } catch (err) {
      console.log("Error while signing in: ", err);
      return thunkApi.rejectWithValue(err);
    }
  }
);

//Logout user
export const logout = createAsyncThunk(
  "auth/logout",
  async (global: boolean, thunkApi) => {
    try {
      return await signOut({ global: global });
    } catch (err) {
      console.log("Error while logging out: ", err);
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setJwtToken: (state, action: PayloadAction<string>) => {
      state.jwtToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //Cases for logging user in
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<CognitoIdTokenPayload | any>) => {
          state.isSuccess = true;
          state.user = action.payload;
          state.isLoading = false;
          state.isError = false;
        }
      )
      .addCase(
        login.rejected,
        (state, action: PayloadAction<CognitoIdTokenPayload | any>) => {
          state.isSuccess = false;
          state.isLoading = false;
          state.isError = true;
          state.error = action || "An error occurred";
        }
      )
      //Cases for logging user out
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(
        logout.fulfilled,
        (state, action: PayloadAction<CognitoIdTokenPayload | any>) => {
          state.isSuccess = true;
          state.user = null;
          state.isLoading = false;
          state.isError = false;
        }
      )
      .addCase(
        logout.rejected,
        (state, action: PayloadAction<CognitoIdTokenPayload | any>) => {
          state.isSuccess = false;
          state.isLoading = false;
          state.isError = true;
          state.error = action || "An error occurred";
        }
      );
  },
});

export const { setUser, setJwtToken } = authSlice.actions;
export default authSlice.reducer;
