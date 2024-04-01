"use client";

import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Left from "@/components/details/Left";
import Relatives from "@/components/details/Relatives";
import Right from "@/components/details/Right";
import Banner2 from "@/components/home/Banner2";
import Container from "@/components/shared/Container";
import Main from "@/components/shared/layouts/Main";
import { getAProduct } from "@/redux/features/productSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Detail = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("product_id");
  const dispatch = useAppDispatch();
  const { singleProduct, isLoading: productLoading } = useAppSelector(
    (state) => state.product
  );
  const product = useMemo(() => singleProduct || {}, [singleProduct]);

  console.log("In product page", product);

  useEffect(() => {
    console.log("in use effect");
    const fetchProduct = async () => {
      console.log("in fetch function");
      if (Object.keys(product).length === 0) {
        console.log("dispatching");
        await dispatch(getAProduct(id));
      }
    };
    fetchProduct();
  }, [dispatch, id, product]);

  return (
    <Main>
      <Container>
        <div className='h-full w-full flex flex-col gap-y-20'>
          <div className='grid grid-cols-12 gap-8'>
            {productLoading || Object.keys(product).length === 0 ? (
              <>
                <div className='lg:col-span-6 md:col-span-6 col-span-12'>
                  <div className='h-[200px] w-full rounded bg-gray-200 animate-pulse' />
                </div>
                <div className='lg:col-span-6 md:col-span-6 col-span-12'>
                  <div className='w-full flex flex-col gap-y-4'>
                    <div className='h-[200px] w-full rounded bg-gray-200 animate-pulse' />
                    <div className='h-[100px] w-full rounded bg-gray-200 animate-pulse' />
                    <div className='h-[50px] w-full rounded bg-gray-200 animate-pulse' />
                  </div>
                </div>
              </>
            ) : (
              <>
                <Left product={product} />
                <Right product={product} />
              </>
            )}
          </div>
          <Relatives />
          <Banner2 className={"!px-0"} />
        </div>
      </Container>
    </Main>
  );
};

export default Detail;
