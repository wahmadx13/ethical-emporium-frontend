"use client";

import React, { useEffect, useMemo } from "react";
import Container from "../shared/Container";
import Card from "../shared/Card";
import Spinner from "../shared/Spinner";
import { useRouter } from "next/navigation";
import { useGetProductsQuery } from "@/services/product/productApi";
import ProductCard from "../shared/skeletonLoading/ProductCard";
import { toast } from "react-hot-toast";
import { IProduct } from "@/redux/@types/product";

const Trending = ({
  trending,
  productsLoading,
}: {
  trending: IProduct[];
  productsLoading: boolean;
}) => {
  const router = useRouter();

  return (
    <Container className=''>
      <section className='flex flex-col gap-y-10'>
        <div className='flex flex-col gap-y-1'>
          <h1 className='text-4xl'>
            What&lsquo;s <span className=''>Trending Now</span>
          </h1>
          <p className='text-base'>
            Discover the most trending products in Ethical Emporium.
          </p>
        </div>
        <div className='flex flex-col gap-y-12'>
          <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-x-6 gap-y-8'>
            {productsLoading ? (
              <>
                {[1, 2, 3, 4].map((_, index) => (
                  <ProductCard key={index} />
                ))}
              </>
            ) : (
              <>
                {trending?.slice(-8)?.map((product, index) => (
                  <Card key={product?._id.toString()} product={product} />
                ))}
              </>
            )}
          </div>
          <button
            className='px-8 py-4 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit mx-auto flex flex-row gap-x-2 items-center'
            onClick={() => router.push("/products")}>
            Show Me More
          </button>
        </div>
        {!productsLoading && trending?.length === 0 && (
          <p className='text-sm'>Oops! No products found!</p>
        )}
      </section>
    </Container>
  );
};

export default Trending;
