
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
  const products = useMemo(() => allProducts || [], [allProducts]);
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
          <NewArrivals products={products} productsLoading={productsLoading} />
          <Banner2 className='' />
          <ExpertChoice products={products} productsLoading={productsLoading} />
          {/* <NicheExplorer /> */}
          <Trending products={products} productsLoading={productsLoading} />
          <Banner3 className='' />
        </main>
      </Main>
    </>
  );
}
