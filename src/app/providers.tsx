'use client'
import { ReactNode, useRef } from "react";
import { Provider as StoreProvider } from "react-redux";
import { AppStore, makeStore } from "@/redux/store"
import AnimatedCursor from "react-animated-cursor";

const Providers = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AppStore>()

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
    <StoreProvider store={storeRef.current}>
      {children}
      <AnimatedCursor
        innerSize={10}
        color="0, 0, 0"
        showSystemCursor={false}
      />
    </StoreProvider>
  );
};

export default Providers;
