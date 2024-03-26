"use client";

import { ReactNode, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { usePersistLoginQuery } from "@/services/auth/authApi";
import { addUser } from "@/features/auth/authSlice";
import { toast } from "react-hot-toast";
import { amplifyInit } from "@/utils/amplifyInit";

const Auth = ({ children }: {children: ReactNode}) => {
  amplifyInit()
  // const dispatch = useDispatch();
  // const { data: userData, error: userError } = usePersistLoginQuery();
  // const user = useMemo(() => userData?.data || {}, [userData]);

  // useEffect(() => {
  //   if (userData && !userError) {
  //     toast.success(userData?.description, { id: "auth" });
  //     dispatch(addUser(user));
  //   }

  //   if (userError?.data) {
  //     toast.error(userError?.data?.description, { id: "auth" });
  //   }
  // }, [userData, userError, dispatch, user]);

  return <>{children}</>;
};

export default Auth;
