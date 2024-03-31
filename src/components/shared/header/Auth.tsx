import Signup from "@/components/icons/Signup";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import { BiUserCheck } from "react-icons/bi";
import { FcGlobe } from "react-icons/fc";
import OutsideClick from "../OutsideClick";
import User from "@/components/icons/User";
import Signin from "@/components/icons/Signin";
import ForgotPassword from "@/components/icons/ForgotPassword";
import Logout from "@/components/icons/Logout";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/authSlice";
import toast from "react-hot-toast";

const Auth = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  //Extracting initials from name for display purpose
  const nameArray = user?.name?.split(" ");
  const initials = nameArray?.map((name: string) => name.charAt(0));
  const combinedInitials = initials?.join("");

  //Logout handler
  const handleLogout = async (global: boolean) => {
    //Clearing cookies
    try {
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      //Clearing localStorage
      localStorage.clear();

      //Clearing sessionStorage
      sessionStorage.clear();
      //Sign out from Amplify
      await dispatch(logout(global));
      toast.success("Signed out successfully!", { id: "signout" });

      if (pathname.includes("/dashboard")) {
        router.push("/");
      }
    } catch (err) {
      console.log("error while signing out", err);
    }
  };

  return (
    <>
      <button
        className='p-2 rounded-secondary hover:bg-slate-100 transition-colors'
        onClick={() => setIsOpen(!isOpen)}>
        <User className='h-6 w-6' />
      </button>
      {isOpen && (
        <OutsideClick
          onOutsideClick={() => setIsOpen(false)}
          className='absolute top-full right-0 w-80 h-fit bg-white border rounded p-2 flex flex-col gap-y-2.5'>
          {!user ? (
            <>
              <Link
                href='/auth/signup'
                className='w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded'>
                <span className='bg-sky-500/5 p-1 rounded'>
                  <Signup />
                </span>
                <article className='whitespace-normal'>
                  <h2 className='text-sm'>Sign Up</h2>
                  <p className='text-xs'>Register as a new user</p>
                </article>
              </Link>
              <Link
                href='/auth/signin'
                className='w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded'>
                <span className='bg-sky-500/5 p-1 rounded'>
                  <Signin />
                </span>
                <article className='whitespace-normal'>
                  <h2 className='text-sm'>Sign In</h2>
                  <p className='text-xs'>Login as an existing user</p>
                </article>
              </Link>
              <Link
                href='/auth/forgot-password'
                className='w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded'>
                <span className='bg-sky-500/5 p-1 rounded'>
                  <ForgotPassword />
                </span>
                <article className='whitespace-normal'>
                  <h2 className='text-sm'>Forgot Password</h2>
                  <p className='text-xs'>Reset your account credentials</p>
                </article>
              </Link>
            </>
          ) : (
            <div className='flex flex-col gap-y-2'>
              <div className='flex flex-row gap-x-2 p-4'>
                <div className='inline-flex items-center justify-center w-14 h-14 text-xl text-white bg-indigo-500 rounded-full'>
                  {combinedInitials}
                </div>
                <article className='flex flex-col'>
                  <h2 className='line-clamp-1'>{user?.name}</h2>
                  <p className='text-sm whitespace-nowrap overflow-hidden text-ellipsis'>
                    {user?.email}
                  </p>
                  <p className='flex flex-row gap-x-2 mt-1.5'>
                    <span className='px-2 border border-emerald-500 text-emerald-500 bg-emerald-50 rounded-primary text-md w-fit flex items-center'>
                      <BiUserCheck />
                    </span>
                    {user?.email_verified && (
                      <span className='bg-emerald-50 border border-emerald-500 px-2 rounded-secondary text-emerald-500 text-md lowercase w-fit'>
                        verified
                      </span>
                    )}
                  </p>
                </article>
              </div>
              <hr />
              <div className='w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded cursor-pointer'>
                <span className='bg-sky-500/5 p-1 rounded'>
                  <Logout />
                </span>
                <article
                  className='whitespace-nowrap'
                  onClick={() => handleLogout(false)}>
                  <h2 className='text-sm'>Logout</h2>
                  <p className='text-xs'>Clear your current activities</p>
                </article>
              </div>
              <div className='w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded cursor-pointer'>
                <span className='bg-sky-500/5 p-1 rounded text-2xl'>
                  <FcGlobe className='border-sky-500/5' />
                </span>
                <article
                  className='whitespace-nowrap'
                  onClick={() => handleLogout(true)}>
                  <h2 className='text-sm'>Global Logout</h2>
                  <p className='text-xs'>Logout from all devices</p>
                </article>
              </div>
            </div>
          )}
        </OutsideClick>
      )}
    </>
  );
};

export default Auth;
