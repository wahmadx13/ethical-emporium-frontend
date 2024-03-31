import { createSlice } from "@reduxjs/toolkit";
import { IFilterSlice } from "@/redux/@types/filter";

const initialState: IFilterSlice = {
  category: null,
  brand: null,
  blog: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setBrand: (state, action) => {
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
