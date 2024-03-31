import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IFilterSlice } from "@/redux/@types/filter";
import { IProductCategory } from "@/redux/@types/productCategory";
import { IBrand } from "@/redux/@types/brand";

const initialState: IFilterSlice = {
  category: null,
  brand: null,
  blog: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<IProductCategory>) => {
      state.category = action.payload;
    },
    setBrand: (state, action: PayloadAction<IBrand>) => {
      state.brand = action.payload;
    },

    clearFilter: (state) => {
      state.category = null;
      state.brand = null;
      state.blog = null;
    },
  },
});

export const { setCategory, setBrand, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
