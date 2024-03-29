import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IBrandSlice } from "@/redux/@types/brand";

//Getting all Brands
export const getAllBrands = createAsyncThunk(
  "brand/get-all-brands",
  async (_, thunkApi) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_BACKEND_BASE_URL}/brand`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(
        "The following error occurred while getting all the brands: ",
        err
      );
      return thunkApi.rejectWithValue(err);
    }
  }
);

const initialState: IBrandSlice = {
  brands: null,
  singleBrand: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrands.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.brands = null;
        state.error = null;
      })
      .addCase(
        getAllBrands.fulfilled,
        (state, action: PayloadAction<IBrandSlice | any>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.error = null;
          state.brands = action.payload;
        }
      )
      .addCase(
        getAllBrands.rejected,
        (state, action: PayloadAction<IBrandSlice | any>) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.error = action.payload;
          state.brands = null;
        }
      );
  },
});

export default brandSlice.reducer;
