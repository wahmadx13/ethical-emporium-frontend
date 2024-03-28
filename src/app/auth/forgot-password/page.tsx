"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { resetPassword } from "aws-amplify/auth";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Spinner from "@/components/shared/Spinner";
import { setUsername } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";

const ResetPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const resetPasswordSchema = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Email is required"),
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
          }}
          validationSchema={resetPasswordSchema}
          onSubmit={async (values: { email: string }) => {
            const { email } = values;
            try {
              setIsLoading(true);
              const output = await resetPassword({ username: email });
              setIsLoading(false);
              const { nextStep } = output;
              switch (nextStep.resetPasswordStep) {
                case "CONFIRM_RESET_PASSWORD_WITH_CODE":
                  const codeDeliveryDetails = nextStep.codeDeliveryDetails;
                  toast.success(
                    `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}: ${codeDeliveryDetails.destination}`,
                    { id: "forgot-password" }
                  );
                  dispatch(setUsername(email));
                  router.push("/auth/reset-password");
                  break;
              }
              console.log("output", output);
            } catch (err) {
              setIsLoading(false);
              toast.error("Something went wrong!", { id: "forgot-password" });
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
                    placeholder='i.e. example@gmail.com'
                    className=''
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </label>
                {errors.email && touched.email ? (
                  <div className='text-red-500 text-base font-medium'>
                    {errors.email}
                  </div>
                ) : null}
                <button
                  type='submit'
                  disabled={hasErrors}
                  className='py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow disabled:bg-gray-200 disabled:border-gray-200 disabled:text-black/50 disabled:cursor-not-allowed flex flex-row justify-center items-center text-sm'>
                  {isLoading ? (
                    <Spinner className='' />
                  ) : (
                    "Get Confirmation Code"
                  )}
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
