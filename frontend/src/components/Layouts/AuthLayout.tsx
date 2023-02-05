import { FC, ReactNode } from "react";
import Logo from "assets/notes.png";

export const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <section className="col-span-7 border-r flex flex-col justify-center items-center">
        <img
          src={Logo}
          alt="logo"
          className="w-40 h-auto transform -rotate-3"
        />
      </section>
      <section className="col-span-5 flex flex-col justify-center items-center">
        {children}
      </section>
    </div>
  );
};
