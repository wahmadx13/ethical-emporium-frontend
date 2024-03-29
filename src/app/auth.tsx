"use client";

import { ReactNode, useEffect, useMemo } from "react";
import { CognitoIdTokenPayload } from "aws-jwt-verify/jwt-model";
import { amplifyInit } from "@/utils/amplifyInit";
import { useAppDispatch } from "@/redux/hooks";
import { setUser, setJwtToken } from "@/redux/features/authSlice";

const Auth = ({
  children,
  userData,
  jwtToken,
}: {
  children: ReactNode;
  userData: CognitoIdTokenPayload;
  jwtToken: string;
}) => {
  const dispatch = useAppDispatch();
  amplifyInit();
  useEffect(() => {
    console.log("userData", userData);
    dispatch(setUser(userData));
    dispatch(setJwtToken(jwtToken));
  }, [dispatch, jwtToken, userData]);

  return <>{children}</>;
};

export default Auth;
