import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProductCategorySlice } from "@/redux/@types/productCategory";

//Getting all product categories
export const getAllCategories = createAsyncThunk(
  "product-category/get-all-categories",
  async (_, thunkApi) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_BACKEND_BASE_URL}/product-category`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(
        "The following error occurred while getting all the products: ",
        err
      );
      return thunkApi.rejectWithValue(err);
    }
  }
);

const initialState: IProductCategorySlice = {
  categories: null,
  singleCategory: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};

const productCategorySlice = createSlice({
  name: "productCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.categories = null;
        state.error = null;
      })
      .addCase(
        getAllCategories.fulfilled,
        (state, action: PayloadAction<IProductCategorySlice | any>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.error = null;
          state.categories = action.payload;
        }
      )
      .addCase(
        getAllCategories.rejected,
        (state, action: PayloadAction<IProductCategorySlice | any>) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.error = action.payload;
          state.categories = null;
        }
      );
  },
});

export default productCategorySlice.reducer;
