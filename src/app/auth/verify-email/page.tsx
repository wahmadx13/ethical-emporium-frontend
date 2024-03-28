"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { confirmSignUp, type ConfirmSignUpInput } from "aws-amplify/auth";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Spinner from "@/components/shared/Spinner";
import { setUsername } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const VerifyEmail = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { username } = useAppSelector((state) => state.auth);

  const signUpSchema = yup.object().shape({
    code: yup
      .string()
      .required(
        "A six digit confirmation code is required for resetting password"
      )
      .matches(/^[\S]+$/, "Confirmation code cannot contain spaces")
      .matches(/[0-9]/, "Confirmation code must be a number")
      .min(6, "Confirmation code must be six characters long")
      .max(6, "Confirmation code can not be greater than six characters"),
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
            email: username,
            code: "",
          }}
          validationSchema={signUpSchema}
          onSubmit={async (values: { email: string; code: string }) => {
            const { email, code } = values;
            try {
              setIsLoading(true);
              await confirmSignUp({
                username: email,
                confirmationCode: code,
              });
              toast.success(
                "Signup process complete. Please signin to continue",
                { id: "verify-email" }
              );
              dispatch(setUsername(null));
              router.push("/auth/signin");
              setIsLoading(false);
            } catch (err: any) {
              setIsLoading(false);
              toast.error(err.message, { id: "verify-email" });
              dispatch(setUsername(null));
              router.push("auth/signup");
            }
          }}>
          {({ errors, touched, handleChange, handleBlur, values }) => {
            const hasErrors =
              Object.keys(touched).length > 0 && Object.keys(errors).length > 0;
            return (
              <Form className='w-full flex flex-col gap-y-4'>
                <label htmlFor='email' className='flex flex-col gap-y-1'>
                  <span className='text-sm'>Enter Your Email</span>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    value={username}
                    placeholder='i.e. example@gmail.com'
                    className='opacity-75 cursor-not-allowed'
                    disabled={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </label>
                <label htmlFor='code' className='flex flex-col gap-y-1'>
                  <span className='text-sm'>Enter Your Code</span>
                  <input
                    type='text'
                    name='code'
                    id='code'
                    value={values.code}
                    placeholder='Enter your six digits confirmation code'
                    className=''
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </label>
                {errors.code && touched.code && (
                  <div className='text-red-500 text-base font-medium'>
                    {errors.code}
                  </div>
                )}
                <button
                  type='submit'
                  disabled={isLoading || hasErrors}
                  className='py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow disabled:bg-gray-200 disabled:border-gray-200 disabled:text-black/50 disabled:cursor-not-allowed flex flex-row justify-center items-center text-sm'>
                  {isLoading ? <Spinner className='' /> : "Verify Email"}
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

export default VerifyEmail;
