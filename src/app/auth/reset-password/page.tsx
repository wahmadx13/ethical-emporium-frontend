"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { confirmResetPassword } from "aws-amplify/auth";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Spinner from "@/components/shared/Spinner";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setUsername } from "@/redux/features/authSlice";

const ResetPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { username } = useAppSelector((state) => state.auth);

  const resetPasswordSchema = yup.object().shape({
    code: yup
      .string()
      .required(
        "A six digit confirmation code is required for resetting password"
      )
      .matches(/^[\S]+$/, "Confirmation code cannot contain spaces")
      .matches(/[0-9]/, "Confirmation code must be a number")
      .min(6, "Confirmation code must be six characters long")
      .max(6, "Confirmation code can not be greater than six characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password characters must be eight characters long")
      .max(15, "Password characters must not exceed fifteen characters")
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
            email: username,
            code: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={resetPasswordSchema}
          onSubmit={async (values) => {
            const { email, code, password } = values;
            console.log("values in resetPassword", values);
            try {
              setIsLoading(true);
              await confirmResetPassword({
                username: email,
                confirmationCode: code,
                newPassword: password,
              });
              toast.success("Password reset Success!", {
                id: "reset-password",
              });
              dispatch(setUsername(null));
              router.push("/auth/signin");
              setIsLoading(false);
            } catch (err: any) {
              console.log("error in resetting password", err);
              toast.error(err.message, { id: "reset-password" });
              dispatch(setUsername(null));
              router.push("/auth/forgot-password");
              setIsLoading(false);
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
                <label htmlFor='password' className='flex flex-col gap-y-1'>
                  <span className='text-sm'>Enter Your New Password</span>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    value={values.password}
                    placeholder='i.e. Admin@123'
                    className=''
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </label>
                {errors.password && touched.password && (
                  <div className='text-red-500 text-base font-medium'>
                    {errors.password}
                  </div>
                )}
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
                  <span className='text-sm'>Enter Your Confirm Password</span>
                  <input
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    value={values.confirmPassword}
                    placeholder='i.e. Admin@123'
                    className=''
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </label>
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className='text-red-500 text-base font-medium'>
                    {errors.confirmPassword}
                  </div>
                )}
                <button
                  type='submit'
                  disabled={hasErrors}
                  className='py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow disabled:bg-gray-200 disabled:border-gray-200 disabled:text-black/50 disabled:cursor-not-allowed flex flex-row justify-center items-center text-sm'>
                  {isLoading ? <Spinner className='' /> : "Reset Password"}
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
          <Link href='/auth/signup' className=''>
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
