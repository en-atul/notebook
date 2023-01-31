import { FC, ReactNode } from "react";

export const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <section className="col-span-7 border-r"></section>
      <section className="col-span-5 flex flex-col justify-center items-center">{children}</section>
    </div>
  );
};
