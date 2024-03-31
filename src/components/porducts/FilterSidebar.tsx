"use client";

import React from "react";
import Link from "next/link";
import { AiOutlineReload } from "react-icons/ai";
import SelectCard from "../shared/skeletonLoading/SelectCard";
import {
  clearFilter,
  setBrand,
  setCategory,
} from "@/redux/features/filterSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

const FilterSidebar = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.filter);

  const { brands: allBrands, isLoading: brandsLoading } = useAppSelector(
    (state) => state.brand
  );
  const { categories: allCategories, isLoading: categoriesLoading } =
    useAppSelector((state) => state.productCategory);

  // const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const brand = searchParams.get("brand");
  const category = searchParams.get("category");

  const brands = allBrands || [];
  const categories = allCategories || [];

  return (
    <aside className='lg:col-span-3 md:col-span-4 col-span-12'>
      <section className='flex flex-col gap-y-4 md:sticky md:top-4'>
        {/* reset */}
        <div className='flex flex-row items-center justify-between border py-2 px-4 rounded'>
          <h2 className='text-lg'>Reset Filter</h2>
          <button
            className='p-1 border rounded-secondary'
            onClick={() => {
              dispatch(clearFilter());

              // Uncheck all checkboxes for categories
              categories.forEach((category) => {
                const checkbox = document.getElementById(
                  category._id.toString()
                ) as HTMLInputElement;
                if (checkbox) {
                  checkbox.checked = false;
                }
              });

              // Uncheck all checkboxes for brands
              brands.forEach((brand) => {
                const checkbox = document.getElementById(
                  brand._id.toString()
                ) as HTMLInputElement;
                if (checkbox) {
                  checkbox.checked = false;
                }
              });

              // Use setTimeout to delay the navigation
              router.push("/products");
            }}>
            <AiOutlineReload className='h-5 w-5' />
          </button>
        </div>

        {/* Choose Category */}
        <div className='flex flex-col gap-y-4 border py-2 px-4 rounded-xl max-h-96 overflow-y-auto scrollbar-hide'>
          <h2 className='text-lg'>Choose Category</h2>
          <div className='flex flex-col gap-y-2.5'>
            {categoriesLoading || categories?.length === 0 ? (
              <>
                {[1, 2, 3].map((_, index) => (
                  <SelectCard key={index} />
                ))}
              </>
            ) : (
              <>
                {categories.map((category) => (
                  <Link
                    key={category._id.toString()}
                    href={`/products?category=${category._id}&brand=${brand}`}>
                    <label
                      htmlFor={category._id.toString()}
                      className='text-sm flex flex-row items-center gap-x-1.5'>
                      <input
                        type='radio'
                        name='category'
                        id={category._id.toString()}
                        value={category.title}
                        checked={category._id === filter.category}
                        onChange={() => dispatch(setCategory(category._id))}
                        className='rounded-secondary checked:bg-primary checked:text-black checked:outline-none checked:ring-0 checked:border-0 focus:outline-none focus:ring-0 focus:border-1 focus:text-black'
                      />
                      {category.title}
                    </label>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Choose Brand */}
        <div className='flex flex-col gap-y-4 border py-2 px-4 rounded-xl max-h-96 overflow-y-auto scrollbar-hide'>
          <h2 className='text-lg'>Choose Brand</h2>
          <div className='flex flex-col gap-y-2.5'>
            {brandsLoading || brands?.length === 0 ? (
              <>
                {[1, 2, 3].map((_, index) => (
                  <SelectCard key={index} />
                ))}
              </>
            ) : (
              <>
                {brands.map((brand) => (
                  <Link
                    key={brand._id.toString()}
                    href={`/products?category=${category}&brand=${brand._id.toString()}`}>
                    <label
                      htmlFor={brand._id.toString()}
                      className='text-sm flex flex-row items-center gap-x-1.5'>
                      <input
                        type='radio'
                        name='brand'
                        id={brand._id.toString()}
                        value={brand.title}
                        checked={brand._id === filter.brand}
                        onChange={() =>
                          dispatch(setBrand(brand._id.toString()))
                        }
                        className='rounded-secondary checked:bg-primary checked:text-black checked:outline-none checked:ring-0 checked:border-0 focus:outline-none focus:ring-0 focus:border-1 focus:text-black'
                      />
                      {brand.title}
                    </label>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default FilterSidebar;
