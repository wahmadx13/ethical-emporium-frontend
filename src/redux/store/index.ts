import { configureStore } from "@reduxjs/toolkit";
import { canimApi } from "@/services/canim";
import { setupListeners } from "@reduxjs/toolkit/query";
// import authSlice from "@/features/auth/authSlice";
import authSlice from "../features/authSlice";
import productFilterSlice from "@/features/productFilter/productFilterSlice";
import productCategorySlice from "../features/productCategorySlice";
import brandSlice from "../features/brandSlice";
import blogSlice from "../features/blogSlice";
import productSlice from "../features/productSlice";
import categorySlice from "@/features/category/categorySlice";
import storeSlice from "@/features/store/storeSlice";
import favoriteSlice from "@/features/favorite/favoriteSlice";
import cartSlice from "@/features/cart/cartSlice";
import purchaseSlice from "@/features/purchase/purchaseSlice";
import filterSlice from "@/features/filter/filterSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [canimApi.reducerPath]: canimApi.reducer,
      auth: authSlice,
      productCategory: productCategorySlice,
      brand: brandSlice,
      category: categorySlice,
      blog: blogSlice,
      product: productSlice,
      store: storeSlice,
      favorite: favoriteSlice,
      cart: cartSlice,
      purchase: purchaseSlice,
      filter: filterSlice,
      productFilter: productFilterSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(canimApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
