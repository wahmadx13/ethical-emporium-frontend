"use client";

import React, { useEffect, useMemo } from "react";
import Banner3 from "@/components/home/Banner3";
import ExpertChoice from "@/components/home/ExpertChoice";
import FilterSidebar from "@/components/porducts/FilterSidebar";
import FilteredProducts from "@/components/porducts/FilteredProducts";
import Container from "@/components/shared/Container";
import Main from "@/components/shared/layouts/Main";
import { getAllProducts } from "@/redux/features/productSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

const Products = () => {
  const dispatch = useAppDispatch();
  const { products: allProducts, isLoading: productsLoading } = useAppSelector(
    (state) => state.product
  );

  //All Products
  const products = useMemo(() => allProducts || [], [allProducts]);

  //Filtering Featured Products
  const featured = useMemo(
    () => products.filter((product) => product.featured === true) || [],
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
    <Main>
      <Container className='flex flex-col gap-y-12 py-8'>
        <section className='grid grid-cols-12 gap-8 pb-12 md:relative'>
          <FilterSidebar />
          <FilteredProducts />
        </section>
        <ExpertChoice
          className='!px-0'
          featured={featured}
          productsLoading={productsLoading}
        />
        <Banner3 className='!px-0' />
      </Container>
    </Main>
  );
};

export default Products;
