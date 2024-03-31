"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import Card from "../shared/Card";
import ProductCard from "../shared/skeletonLoading/ProductCard";
import { makeLowerCaseString } from "@/utils/helper";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setBrand, setCategory } from "@/features/filter/filterSlice";
import { IProduct } from "@/redux/@types/product";

const FilteredProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const filter = useAppSelector((state) => state.filter);
  const { products: allProducts, isLoading: productsLoading } = useAppSelector(
    (state) => state.product
  );
  const { categories: allCategories, isLoading: categoriesLoading } =
    useAppSelector((state) => state.productCategory);

  const { brands: allBrands, isLoading: brandsLoading } = useAppSelector(
    (state) => state.brand
  );
  const products = useMemo(() => allProducts || [], [allProducts]);
  const categories = useMemo(() => allCategories || [], [allCategories]);
  const brands = useMemo(() => allBrands || [], [allBrands]);

  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand");
  const category = searchParams.get("category");

  useEffect(() => {
    if (productsLoading) {
      toast.loading("Loading...", {
        id: "filtered-products",
      });
    }

    //Ensure brand and category are valid before dispatching actions
    if (brand) dispatch(setBrand(brands.find((br) => br._id === brand)));
    if (category)
      dispatch(setCategory(categories.find((cat) => cat._id === category)));

    //Normalize filter category and brand titles
    const normalizedFilterCategory = makeLowerCaseString(
      filter?.category?.title
    );

    const normalizedFilterBrand = makeLowerCaseString(filter?.brand?.title);

    let filteredProducts = products;

    //Check if at least one filter title is available
    if (normalizedFilterCategory || normalizedFilterBrand) {
      //Filter products based on category
      if (normalizedFilterCategory) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            normalizedFilterCategory === makeLowerCaseString(product.category)
        );
      }

      //Filter products based on brand
      if (normalizedFilterBrand) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            normalizedFilterBrand === makeLowerCaseString(product.brand)
        );
      }
    }

    //Set filtered products state
    setFilteredProducts(filteredProducts);
  }, [
    products,
    productsLoading,
    brand,
    category,
    dispatch,
    allProducts,
    categories,
    brands,
    filter.category,
    filter.brand,
  ]);

  return (
    <div className='lg:col-span-9 md:col-span-8 col-span-12'>
      <div className='flex flex-col gap-y-8'>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-x-6 gap-y-8'>
          {productsLoading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <ProductCard key={index} />
              ))}
            </>
          ) : (
            <>
              {filteredProducts.map((product, index) => (
                <Card key={index} product={product} />
              ))}
            </>
          )}
        </div>
        {!productsLoading && filteredProducts?.length === 0 && (
          <p className='text-center'>Oops! No products found!</p>
        )}
      </div>
    </div>
  );
};

export default FilteredProducts;
