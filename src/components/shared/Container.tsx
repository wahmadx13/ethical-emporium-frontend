import React, { ReactNode } from "react";

const Container = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children: ReactNode;
  props?: any;
}) => {
  return (
    <section
      {...props}
      className={
        "max-w-7xl mx-auto px-4 w-full" + (className ? " " + className : "")
      }>
      {children}
    </section>
  );
};

export default Container;
