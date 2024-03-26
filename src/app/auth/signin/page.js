"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import Spinner from "@/components/shared/Spinner";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { login } from "../../../redux/features/authSlice";

const Signin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isLoading: authLoading } = useAppSelector((state) => state.auth);

  const signInSchema = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup.string().required("Password is Required"),
  });

  return (
    <section className='w-screen h-screen flex justify-center items-center px-4'>
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
            email: "",
            password: "",
          }}
          validationSchema={signInSchema}
          onSubmit={async (values) => {
            const response = await dispatch(
              login({ username: values.email, password: values.password })
            );
            if (response?.error?.message === "Rejected") {
              toast.error(response?.payload?.message, {
                id: "signin",
              });
            }
            if (authLoading) {
              toast.loading("Signing in...", { id: "signin" });
            }
          }}>
          {({ errors, touched, handleChange, handleBlur }) => {
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
                <button
                  type='submit'
                  disabled={authLoading || hasErrors}
                  className='py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow disabled:bg-gray-200 disabled:border-gray-200 disabled:text-black/50 disabled:cursor-not-allowed flex flex-row justify-center items-center text-sm'>
                  {authLoading ? <Spinner /> : "Sign In"}
                </button>
              </Form>
            );
          }}
        </Formik>
        <div className='flex flex-row justify-center items-center gap-x-2 text-xs'>
          <Link href='/auth/signup' className=''>
            Sign Up
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

export default Signin;
