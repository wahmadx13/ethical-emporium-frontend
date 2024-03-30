"use client";

import React, { useEffect, useMemo } from "react";
import Container from "../shared/Container";
import Card from "../shared/Card";
import ProductCard from "../shared/skeletonLoading/ProductCard";
import { getAllProducts } from "@/redux/features/productSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

const NewArrivals = () => {
  const dispatch = useAppDispatch();
  const { products: allProducts, isLoading: productsLoading } = useAppSelector(
    (state) => state.product
  );
  const products = useMemo(() => allProducts || [], [allProducts]);
  const newArrivals = useMemo(
    () => products.filter((product) => product.newArrival === true) || [],
    [products]
  );

  console.log("newArrivals", newArrivals);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!products.length) {
        await dispatch(getAllProducts());
      }
    };
    fetchProducts();
  }, [dispatch, products.length]);

  return (
    <Container>
      <section className='flex flex-col gap-y-10'>
        <h1 className='text-4xl'>
          New Arrivals. <span className=''>New Equipment</span>
        </h1>

        <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-x-6 gap-y-8'>
          {productsLoading ? (
            <>
              {[1, 2, 3, 4].map((_, index) => (
                <ProductCard key={index} />
              ))}
            </>
          ) : (
            <>
              {newArrivals?.slice(0, 4)?.map((product, index) => (
                <Card key={product._id} index={index} product={product} />
              ))}
            </>
          )}
        </div>
        {!productsLoading && products?.length === 0 && (
          <p className='text-sm'>No products found</p>
        )}
      </section>
    </Container>
  );
};

export default NewArrivals;
