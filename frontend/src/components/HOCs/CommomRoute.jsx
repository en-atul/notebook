import React from "react";
import { Outlet } from "react-router-dom";
import { DefaultLayout } from "components/Layouts";

export const CommonRoute = ({ children, layout: ComponentLayout }) => {
  const Layout = ComponentLayout || DefaultLayout;

  return children ? <Layout>{children}</Layout> : <Outlet />;
};
