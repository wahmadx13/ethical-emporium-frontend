"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";
import Spinner from "@/components/shared/Spinner";

import React from "react";

const RefreshAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser();
        console.log("User is authenticated");
        router.replace("/");
      } catch (err) {
        console.log("error in /auth/refresh-auth", err);
        console.log("clearing cookies");
        //Get last auth user from cookie
        const userId = document.cookie
          .split("; ")
          .find((row) =>
            row.startsWith(
              `CognitoIdentityServiceProvider.${process.env.NEXT_USER_POOL_CLIENT_ID}.LastAuthUser`
            )
          )
          ?.split("=")[1];
        //Clearing cognito related cookies
        document.cookie = `CognitoIdentityServiceProvider.${process.env.NEXT_USER_POOL_CLIENT_ID}.LastAuthUser =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

        document.cookie = `CognitoIdentityServiceProvider.${process.env.NEXT_USER_POOL_CLIENT_ID}.${userId}.idToken =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

        document.cookie = `CognitoIdentityServiceProvider.${process.env.NEXT_USER_POOL_CLIENT_ID}.${userId}.accessToken =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

        document.cookie = `CognitoIdentityServiceProvider.${process.env.NEXT_USER_POOL_CLIENT_ID}.${userId}.refreshToken =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

        document.cookie = `CognitoIdentityServiceProvider.${process.env.NEXT_USER_POOL_CLIENT_ID}.${userId}.userData =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        console.log("redirecting to signin", pathname);
        if (pathname.includes("/dashboard")) {
          router.replace("/auth/signin");
        } else {
          router.replace(pathname);
        }
      }
    };
    console.log("In Refresh Auth");
    checkAuth();
  }, [pathname, router]);
  return <Spinner className='' />;
};

export default RefreshAuth;
