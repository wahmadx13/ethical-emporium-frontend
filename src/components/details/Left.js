"use client";
import React from "react";
import LoadImage from "../shared/LoadImage";
import SoldOut from "../icons/SoldOut";
import Arrival from "../icons/Arrival";
import DetailCard from "./DetailCard";
import { capitalizeFirstLetter } from "@/utils/helper";

const Left = ({ product }) => {
  // Function to determine the column span class
  function getColumnSpanClass(index, totalThumbnails) {
    if (totalThumbnails === 1) {
      return "col-span-12";
    } else if (totalThumbnails === 2) {
      return index <= 1 ? "col-span-6" : "col-span-6";
    } else if (totalThumbnails === 3) {
      return index === 0 ? "col-span-12" : "col-span-6";
    } else if (totalThumbnails === 4) {
      return "col-span-6";
    } else if (totalThumbnails === 5) {
      return index <= 1 ? "col-span-6" : "col-span-4";
    } else {
      return "";
    }
  }

  const hashTags = [...(product?.tags || [])].filter(
    (tag) => tag !== undefined
  );

  return (
    <section className='lg:col-span-6 md:col-span-6 col-span-12 flex flex-col gap-y-4'>
      <div className='flex flex-col gap-y-4'>
        <LoadImage
          src={product.images[0]?.url}
          alt={product.images[0]?.public_id}
          width={480}
          height={200}
          className='rounded w-full h-full object-cover'
        />
        <div className='grid grid-cols-12 gap-4'>
          {product?.images?.map((image, index) => (
            <LoadImage
              src={image?.url}
              key={image.asset_id}
              alt={image?.public_id}
              className={
                "rounded object-cover max-w-full w-full h-full" +
                " " +
                getColumnSpanClass(index, product.images.length)
              }
              width={480}
              height={200}
            />
          ))}
        </div>
      </div>
      <article className='flex flex-col gap-y-4'>
        <div className='flex flex-row gap-x-2.5'>
          <Badge className='text-indigo-800 bg-indigo-100'>
            {product?.color?.length + " " + "Colors"}
          </Badge>
          {/* {product?.campaign?.state === "discount" && (
            <Badge className="text-cyan-800 bg-cyan-100 flex flex-row items-center gap-x-1">
              <Discount /> {product?.campaign?.title}
            </Badge>
          )} */}
          {product?.quantity === 0 && (
            <Badge className='text-cyan-800 bg-cyan-100 flex flex-row items-center gap-x-1'>
              <SoldOut /> Out of stock
            </Badge>
          )}
          {product?.newArrival && (
            <Badge className='text-cyan-800 bg-cyan-100 flex flex-row items-center gap-x-1'>
              <Arrival /> New Arrivals
            </Badge>
          )}
          {product?.trending && (
            <Badge className='text-blue-800 bg-blue-100 flex flex-row items-center gap-x-1'>
              <Arrival /> Hot in town
            </Badge>
          )}
          {product?.featured && (
            <Badge className='text-blue-800 bg-blue-100 flex flex-row items-center gap-x-1'>
              <Arrival /> Expert&apos;s choice
            </Badge>
          )}
        </div>
        <div className='flex flex-col gap-y-2.5'>
          <DetailCard
            title={`From ${capitalizeFirstLetter(product?.category)} Category`}
            // content={product?.category?.keynotes}
          />
          <DetailCard
            title={`From ${capitalizeFirstLetter(product?.brand)} Brand`}
            // content={product?.description}
          />

          <div className='flex flex-row flex-wrap gap-1 mt-4'>
            {hashTags.map((hashTag, index) => (
              <span
                key={index}
                className='!text-xs border px-2 py-0.5 rounded-sm'>{`#${hashTag
                .replace(/[^a-zA-Z0-9-]/g, "-")
                .toLowerCase()}`}</span>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
};

function Badge({ props, children, className }) {
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

export default Left;
