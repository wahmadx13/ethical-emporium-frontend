import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProductSlice } from "@/redux/@types//product";

//Getting all Products
export const getAllProducts = createAsyncThunk(
  "product/get-all-products",
  async (_, thunkApi) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_BACKEND_BASE_URL}/product`,
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

//Getting a single product
export const getAProduct = createAsyncThunk(
  "product/get-a-product",
  async (id: string, thunkApi) => {
    console.log('id', id)
    try {
      const response = await fetch(
        `${process.env.NEXT_BACKEND_BASE_URL}/product/${id}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(
        "The following error occurred while getting all the product: ",
        err
      );
      return thunkApi.rejectWithValue(err);
    }
  }
);

const initialState: IProductSlice = {
  products: null,
  singleProduct: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};

const brandSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Cases for getting all products
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.products = null;
        state.error = null;
      })
      .addCase(
        getAllProducts.fulfilled,
        (state, action: PayloadAction<IProductSlice | any>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.error = null;
          state.products = action.payload;
        }
      )
      .addCase(
        getAllProducts.rejected,
        (state, action: PayloadAction<IProductSlice | any>) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.error = action.payload;
          state.products = null;
        }
      )
      //Cases for getting a single product
      .addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.singleProduct = null;
        state.error = null;
      })
      .addCase(
        getAProduct.fulfilled,
        (state, action: PayloadAction<IProductSlice | any>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.error = null;
          state.singleProduct = action.payload;
        }
      )
      .addCase(
        getAProduct.rejected,
        (state, action: PayloadAction<IProductSlice | any>) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.error = action.payload;
          state.singleProduct = null;
        }
      );
  },
});

export default brandSlice.reducer;
