"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { getCurrentUser } from "aws-amplify/auth";
import Spinner from "@/components/shared/Spinner";

import React from "react";

const RefreshAuth = () => {
  const router = useRouter();
  const prevRouteRef = useRef<string | null>(null);
  useEffect(() => {
    prevRouteRef.current = router.asPath;
    const checkAuth = async () => {
      try {
        await getCurrentUser();
        console.log("User is authenticated");
        const prevRoute = prevRouteRef.current;
        router.replace(prevRoute || "/");
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
        console.log("redirecting to signin");
        router.replace("/auth/sign-in");
      }
    };
    console.log("In Refresh Auth");
    checkAuth();
  }, [router]);
  return <Spinner className='' />;
};

export default RefreshAuth;
