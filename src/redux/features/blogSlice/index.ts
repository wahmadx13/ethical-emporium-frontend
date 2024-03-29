import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IBlogSlice } from "@/redux/@types/blog";

//Getting all Blogs
export const getAllBlogs = createAsyncThunk(
  "blogs/get-all-blogs",
  async (_, thunkApi) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_BACKEND_BASE_URL}/blog`,
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

const initialState: IBlogSlice = {
  blogs: null,
  singleBlog: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.blogs = null;
        state.error = null;
      })
      .addCase(
        getAllBlogs.fulfilled,
        (state, action: PayloadAction<IBlogSlice | any>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.error = null;
          state.blogs = action.payload;
        }
      )
      .addCase(
        getAllBlogs.rejected,
        (state, action: PayloadAction<IBlogSlice | any>) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.error = action.payload;
          state.blogs = null;
        }
      );
  },
});

export default blogSlice.reducer;
