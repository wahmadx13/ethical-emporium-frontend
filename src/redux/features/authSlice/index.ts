import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CognitoIdTokenPayload } from "aws-jwt-verify/jwt-model";
import { signIn, type SignInInput } from "aws-amplify/auth";
import { IAuthInitialState } from "@/redux/@types/auth";

const initialState: IAuthInitialState = {
  user: null,
  jwtToken: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  error: null,
};

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
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<CognitoIdTokenPayload | any>) => {
          state.isSuccess = action.payload;
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
          state.error = action.payload?.message || "An error occurred";
        }
      );
  },
});

export const { setUser, setJwtToken } = authSlice.actions;
export default authSlice.reducer;
