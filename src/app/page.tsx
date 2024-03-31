
"use client";

import { useEffect, useMemo } from "react";
import Banner1 from "@/components/home/Banner1";
import Banner2 from "@/components/home/Banner2";
import Banner3 from "@/components/home/Banner3";
import ExpertChoice from "@/components/home/ExpertChoice";
import NewArrivals from "@/components/home/NewArrivals";
import NicheExplorer from "@/components/home/NicheExplorer";
import Steps from "@/components/home/Steps";
import Trending from "@/components/home/Trending";
import Main from "@/components/shared/layouts/Main";
import { getAllProducts } from "@/redux/features/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Home() {
  const dispatch = useAppDispatch();
  const { products: allProducts, isLoading: productsLoading } = useAppSelector(
    (state) => state.product
  );

  //All Products
  const products = useMemo(() => allProducts || [], [allProducts]);

  //Filtering New Arrival Products
  const newArrivals = useMemo(
    () => products.filter((product) => product.newArrival === true) || [],
    [products]
  );

  //Filtering Featured Products
  const featured = useMemo(
    () => products.filter((product) => product.featured === true) || [],
    [products]
  );

  //Filtering Trending Products
  const trending = useMemo(
    () => products?.filter((product) => product?.trending === true) || [],
    [products]
  );
  useEffect(() => {
    const fetchProducts = async () => {
      if (!products.length) {
        await dispatch(getAllProducts());
      }
    };
    fetchProducts();
  }, [dispatch, products.length]);
  return (
    <>
      <Main>
        <main className='flex flex-col gap-y-20 w-full'>
          <Banner1 />
          <Steps />
          <NewArrivals
            newArrivals={newArrivals}
            productsLoading={productsLoading}
          />
          <Banner2 />
          <ExpertChoice featured={featured} productsLoading={productsLoading} />
          {/* <NicheExplorer /> */}
          <Trending trending={trending} productsLoading={productsLoading} />
          <Banner3 />
        </main>
      </Main>
    </>
  );
}
