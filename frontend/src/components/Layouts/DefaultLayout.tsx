import { FC, ReactNode } from "react";

export const DefaultLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="w-screen h-screen bg-gray-100">{children}</div>;
};
