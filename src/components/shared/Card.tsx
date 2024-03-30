"use client";

import React, { ReactNode } from "react";
import { AiFillStar } from "react-icons/ai";
import SoldOut from "../icons/SoldOut";
import Arrival from "../icons/Arrival";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { capitalizeFirstLetter } from "@/utils/helper";
import { IProduct } from "@/redux/@types/product";
import { useAppSelector } from "@/redux/hooks";

const Card = ({
  index,
  product,
  ...rest
}: {
  index?: number;
  product: IProduct;
}) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth);

  return (
    <div
      {...rest}
      className='flex-shrink-0 flex flex-col gap-y-6 group border hover:border-black transition-colors rounded-lg'>
      <div className='relative h-[200px] w-full rounded-lg'>
        <Image
          src={product?.images[0]?.url}
          alt={product?.images[0]?.public_id}
          width={296}
          height={200}
          className='h-[200px] w-full rounded-t-lg object-cover'
        />
        <div className='flex flex-row gap-x-2.5 absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity'>
          <Logo
            src={product?.images[1]?.url}
            alt={product?.images[1]?.public_id}
          />
          <Logo
            src={product?.images[2]?.url}
            alt={product?.images[1]?.public_id}
          />
        </div>

        <span className='text-xs bg-white/80 px-2.5 py-0.5 rounded-xl absolute bottom-4 right-4 cursor-not-allowed'>
          {product?.quantity === 0 && (
            <span className='flex flex-row gap-x-0.5 items-center'>
              <SoldOut className='' /> Out of stock
            </span>
          )}
          {product?.newArrival && (
            <span className='flex flex-row gap-x-0.5 items-center'>
              <Arrival className='' /> Latest from Ethical Emporium
            </span>
          )}
          {product?.quantity !== 0 && (
            <span className='flex flex-row gap-x-0.5 items-center'>
              <Arrival className='' /> Available! Grab it!
            </span>
          )}
        </span>
      </div>
      <article className='flex flex-col gap-y-3.5 px-4 h-full'>
        <div className='flex flex-row items-center gap-x-1.5'>
          <Badge className='text-indigo-800 bg-indigo-100'>
            {product?.color?.length + " " + "Colors"}
          </Badge>
        </div>
        <div
          className='flex flex-col gap-y-4 cursor-pointer h-full'
          onClick={() =>
            router.push(
              `/product?product_id=${
                product?._id
              }&product_title=${product?.title
                .replace(/ /g, "-")
                .toLowerCase()}}`
            )
          }>
          <h2 className='line-clamp-2 h-full'>{product?.title}</h2>
          <div className='flex flex-row items-center gap-x-1.5 justify-center align-middle'>
            {product?.tags.map((tag, index) => (
              <Badge
                key={`${tag} - ${index}`}
                className='text-indigo-800 bg-indigo-100'>
                {capitalizeFirstLetter(tag)}
              </Badge>
            ))}
          </div>
          <div className='flex flex-row items-end justify-between mt-auto'>
            <span className='flex items-center border-2 border-green-500 rounded py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium'>
              <span className='text-green-500 !leading-none'>
                ${product?.price}.00
              </span>
            </span>
            <span className='flex flex-row items-center gap-x-0.5'>
              <AiFillStar className='text-[#ffc242]' />
              <span className='text-sm'>{product?.ratings?.length}</span>
            </span>
          </div>
        </div>
      </article>
      <div></div>
    </div>
  );
};

function Badge({
  props,
  children,
  className,
}: {
  props?: any;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={
        "px-3 py-1 rounded text-xs w-fit" + (className ? " " + className : "")
      }
      {...props}>
      {children}
    </span>
  );
}

function Logo({
  src,
  alt,
  props,
  className,
}: {
  src: string;
  alt: string;
  props?: any;
  className?: ReactNode;
}) {
  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      width={30}
      height={30}
      className={
        "w-[30px] h-[30px] object-cover rounded-[5px] shadow border border-transparent hover:border-black transition-colors cursor-help" +
        (className ? " " + className : "")
      }
    />
  );
}

export default Card;
