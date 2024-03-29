"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { signUp } from "aws-amplify/auth";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Spinner from "@/components/shared/Spinner";
import { setUsername } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";

const Signup = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const signUpSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(5, "Name must be at least five characters long"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password characters must be eight characters long")
      .max(15, "Password characters must exceed not fifteen characters")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[A-Z]/,
        "Password must contain at least one uppercase character"
      )
      .matches(/[a-z]/, "Password must contain at least one lower character")
      .matches(/^[\S]+$/, "Password must not contain any spaces")
      .matches(/[^\w]/, "Password must contain at least on special characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Confirm password must match")
      .required("Confirm password is required"),
    phoneNumber: yup
      .string()
      .matches(
        /^\+[1-9]\d{1,14}$/,
        "Phone number must be in E.164 format starting with '+'"
      )
      .required("Phone number is required"),
  });

  return (
    <section className='min-w-full min-h-screen flex justify-center items-center p-4'>
      <div className='max-w-md w-full flex flex-col gap-y-4 border p-8 rounded-primary'>
        <div className='flex flex-row items-center gap-x-2'>
          <hr className='w-full' />
          <Image
            src='/logo.png'
            alt='logo'
            width={141}
            height={40}
            className='max-w-full cursor-pointer'
            onClick={() => router.push("/")}
          />
          <hr className='w-full' />
        </div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
          }}
          validationSchema={signUpSchema}
          onSubmit={async (values) => {
            const { name, email, password, phoneNumber } = values;
            try {
              setIsLoading(true);
              await signUp({
                username: email,
                password,
                options: {
                  userAttributes: {
                    email,
                    phone_number: phoneNumber,
                    name,
                  },
                },
              });
              dispatch(setUsername(email));
              router.push("/auth/verify-email");
              toast.success(
                "Confirmation code sent to email. Please Verify in next step",
                { id: "signup" }
              );
              setIsLoading(false);
            } catch (err: any) {
              setIsLoading(false);
              toast.error(err.message, { id: "signup" });
            }
          }}>
          {({ errors, touched, handleChange, handleBlur }) => {
            const hasErrors =
              Object.keys(touched).length > 0 && Object.keys(errors).length > 0;
            return (
              <Form className='w-full flex flex-col gap-y-4'>
                <label htmlFor='name' className='flex flex-col gap-y-1'>
                  <span className='text-sm'>Enter Your Name</span>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    placeholder='i.e. John Doe'
                    className=''
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </label>
                {errors.name && touched.name ? (
                  <div className='text-red-500 text-base font-medium'>
                    {errors.name}
                  </div>
                ) : null}
                <label htmlFor='email' className='flex flex-col gap-y-1'>
                  <span className='text-sm'>Enter Your Email</span>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='i.e. example@gmail.com'
                    className=''
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </label>
                {errors.email && touched.email ? (
                  <div className='text-red-500 text-base font-medium'>
                    {errors.email}
                  </div>
                ) : null}
                <label htmlFor='password' className='flex flex-col gap-y-1'>
                  <span className='text-sm'>Enter Your Password</span>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='i.e. Admin@123'
                    className=''
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </label>
                {errors.password && touched.password ? (
                  <div className='text-red-500 text-base font-medium'>
                    {errors.password}
                  </div>
                ) : null}
                <ul className='list-none text-gray-400 text-xs'>
                  <li>Password should be at least 8 characters long</li>
                  <li>Password should be not more than 8 characters long</li>
                  <li>Password should have at least 1 number</li>
                  <li>Password should have at least 1 uppercase character</li>
                  <li>Password should have at least 1 lower character</li>
                  <li>Password should have at least 1 special character</li>
                  <li>Password should have any white spaces</li>
                </ul>
                <label
                  htmlFor='confirmPassword'
                  className='flex flex-col gap-y-1'>
                  <span className='text-sm'>Confirm Your Password</span>
                  <input
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    placeholder='i.e. Admin@123'
                    className=''
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </label>
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div className='text-red-500 text-base font-medium'>
                    {errors.confirmPassword}
                  </div>
                ) : null}
                <label htmlFor='phoneNumber' className='flex flex-col gap-y-1'>
                  <span className='text-sm'>Enter Your Phone Number</span>
                  <input
                    type='text'
                    name='phoneNumber'
                    id='phoneNumber'
                    placeholder='i.e. +140478623'
                    className=''
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </label>
                {errors.phoneNumber && touched.phoneNumber ? (
                  <div className='text-red-500 text-base font-medium'>
                    {errors.phoneNumber}
                  </div>
                ) : null}
                <button
                  type='submit'
                  disabled={isLoading || hasErrors}
                  className='py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow disabled:bg-gray-200 disabled:border-gray-200 disabled:text-black/50 disabled:cursor-not-allowed flex flex-row justify-center items-center text-sm'>
                  {isLoading ? <Spinner className='' /> : "Sign Up"}
                </button>
              </Form>
            );
          }}
        </Formik>
        <div className='flex flex-row justify-center items-center gap-x-2 text-xs'>
          <Link href='/auth/signin' className=''>
            Sign In
          </Link>
          <span className='h-4 border-l' />
          <Link href='/auth/forgot-password' className=''>
            Forgot Password
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Signup;
