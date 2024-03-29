"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiCategory, BiChevronDown } from "react-icons/bi";
import OutsideClick from "../OutsideClick";
import CategoryCard from "../skeletonLoading/CategoryCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getAllCategories } from "@/redux/features/productCategorySlice";
import { getAllBrands } from "@/redux/features/brandSlice";
import { getAllBlogs } from "@/redux/features/blogSlice";

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("categories");
  const dispatch = useAppDispatch();

  //Categories State
  const { categories: productCategories, isLoading: categoriesLoading } =
    useAppSelector((state) => state.productCategory);

  //Brands State
  const { brands: allBrands, isLoading: brandsLoading } = useAppSelector(
    (state) => state.brand
  );

  //Blogs States
  const { blogs: allBlogs, isLoading: blogsLoading } = useAppSelector(
    (state) => state.blog
  );

  const categories = useMemo(
    () => productCategories || [],
    [productCategories]
  );
  const brands = useMemo(() => allBrands || [], [allBrands]);

  const blogs = useMemo(() => allBlogs || [], [allBlogs]);

  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      if (!categories.length) {
        await dispatch(getAllCategories());
      }
    };
    fetchCategories();
  }, [categories.length, dispatch]);

  useEffect(() => {
    const fetchBrands = async () => {
      if (!brands.length) {
        await dispatch(getAllBrands());
      }
    };
    fetchBrands();
  }, [brands.length, dispatch]);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!blogs.length) {
        await dispatch(getAllBlogs());
      }
    };
    fetchBlogs();
  }, [blogs.length, dispatch]);

  return (
    <>
      <button
        className='border px-2.5 py-1.5 rounded flex flex-row items-center gap-x-0.5 hover:border-black transition-colors'
        onClick={() => setIsOpen(!isOpen)}>
        <BiCategory className='h-6 w-6' />
        <BiChevronDown className='h-6 w-6' />
      </button>

      {isOpen && (
        <OutsideClick
          onOutsideClick={() => setIsOpen(false)}
          className='absolute top-full left-0 w-80 h-96 overflow-y-auto bg-white border rounded p-4 flex flex-col gap-y-4'>
          <section className='flex flex-col gap-y-4 h-full'>
            <div className='flex flex-row gap-x-2'>
              <button
                type='button'
                className={`text-xs px-2 py-1 border rounded ${
                  tab === "categories" ? "!bg-black !text-white" : ""
                }`}
                onClick={() => setTab("categories")}>
                Categories
              </button>
              <button
                type='button'
                className={`text-xs px-2 py-1 border rounded ${
                  tab === "brands" ? "!bg-black !text-white" : ""
                }`}
                onClick={() => setTab("brands")}>
                Brands
              </button>
              <button
                type='button'
                className={`text-xs px-2 py-1 border rounded ${
                  tab === "stores" ? "!bg-black !text-white" : ""
                }`}
                onClick={() => setTab("blogs")}>
                Blogs
              </button>
            </div>

            <div className='h-full overflow-y-auto scrollbar-hide'>
              {tab === "categories" && (
                <>
                  {categoriesLoading ? (
                    <div className='flex flex-col gap-y-4'>
                      {[1, 2, 3, 4, 5, 6].map((_, index) => (
                        <CategoryCard key={index} />
                      ))}
                    </div>
                  ) : (
                    <>
                      {categories.map((category) => (
                        <div
                          key={category?._id.toString()}
                          className='w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded cursor-pointer'
                          onClick={() => {
                            router.push("/products?category=" + category?._id);
                            setIsOpen(false);
                          }}>
                          {/* <Image
                            src={category?.title}
                            alt={`${category?.title}-thumbnail`}
                            width={40}
                            height={40}
                            className='h-[40px] w-[40px] object-cover rounded'
                          /> */}
                          <article className='whitespace-normal'>
                            <h2 className='text-sm'>{category?.title}</h2>
                            <p className='text-xs line-clamp-2'>
                              {`${category.title}: A modern marvel of technology, combining
                              functionality with sleek design to enhance your
                              daily life with convenience and style.`}
                            </p>
                            {/* <span className='text-[10px] bg-purple-300/50 text-purple-500 border border-purple-500 px-1.5 rounded'>
                              Products: {category?.products?.length}
                            </span> */}
                          </article>
                        </div>
                      ))}
                    </>
                  )}

                  {!categoriesLoading && categories?.length === 0 && (
                    <p className='text-xs'>Oops! No categories found!</p>
                  )}
                </>
              )}
              {tab === "brands" && (
                <>
                  {brandsLoading || brands?.length === 0 ? (
                    <div className='flex flex-col gap-y-4'>
                      {[1, 2, 3, 4, 5, 6].map((_, index) => (
                        <CategoryCard key={index} />
                      ))}
                    </div>
                  ) : (
                    <>
                      {brands.map((brand) => (
                        <div
                          key={brand?._id.toString()}
                          className='w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded cursor-pointer'
                          onClick={() => {
                            router.push("/products?brand=" + brand?._id);
                            setIsOpen(false);
                          }}>
                          {/* <Image
                            src={brand?.logo?.url}
                            alt={brand?.logo?.public_id}
                            width={40}
                            height={40}
                            className='h-[40px] w-[40px] object-cover rounded'
                          /> */}
                          <article className='whitespace-normal'>
                            <h2 className='text-sm'>{brand?.title}</h2>
                            <p className='text-xs line-clamp-2'>
                              {`${brand.title}: A modern marvel of technology, combining
                              functionality with sleek design to enhance your
                              daily life with convenience and style.`}
                            </p>
                            {/* <span className='text-[10px] bg-purple-300/50 text-purple-500 border border-purple-500 px-1.5 rounded'>
                              Products: {brand?.products?.length}
                            </span> */}
                          </article>
                        </div>
                      ))}
                    </>
                  )}

                  {!brandsLoading && brands?.length === 0 && (
                    <p className='text-xs'>Oops! No brands found!</p>
                  )}
                </>
              )}
              {tab === "blogs" && (
                <>
                  {blogsLoading || blogs?.length === 0 ? (
                    <div className='flex flex-col gap-y-4'>
                      {[1, 2, 3, 4, 5, 6].map((_, index) => (
                        <CategoryCard key={index} />
                      ))}
                    </div>
                  ) : (
                    <>
                      {blogs.map((blog) => (
                        <div
                          key={blog?._id.toString()}
                          className='w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded cursor-pointer'
                          onClick={() => {
                            router.push("/products?store=" + blog?._id);
                            setIsOpen(false);
                          }}>
                          <Image
                            src={blog.images[0].url}
                            alt={blog.images[0].public_id}
                            width={40}
                            height={40}
                            className='h-[40px] w-[40px] object-cover rounded'
                          />
                          <article className='whitespace-normal'>
                            <h2 className='text-sm'>{blog?.title}</h2>
                            <p
                              className='text-xs line-clamp-2'
                              dangerouslySetInnerHTML={{
                                __html: blog.description,
                              }}
                            />
                            <div className='flex justify-between align-middle mt-2'>
                              <span className='text-[10px] bg-emerald-300/50 text-emerald-500 border border-emerald-500 px-1.5 rounded'>
                                Likes: {blog.likes.length}
                              </span>
                              <span className='text-[10px] bg-purple-300/50 text-purple-500 border border-purple-500 px-1.5 rounded'>
                                Dislikes: {blog.dislikes.length}
                              </span>
                            </div>
                          </article>
                        </div>
                      ))}
                    </>
                  )}

                  {!blogsLoading && blogs?.length === 0 && (
                    <p className='text-xs'>Oops! No Blogs found!</p>
                  )}
                </>
              )}
            </div>
          </section>
        </OutsideClick>
      )}
    </>
  );
};

export default Categories;
