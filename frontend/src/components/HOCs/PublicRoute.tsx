import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import { DefaultLayout } from "components";
import { CurrentUserType } from "interfaces";
import { FC, ReactNode } from "react";
import { queryKeys } from "definitions";

export const PublicRoute: FC<{
  children: ReactNode;
  layout: FC<{
    children: ReactNode;
  }>;
}> = ({ children, layout: ComponentLayout }) => {
  const Layout = ComponentLayout || DefaultLayout;

  const { data } = useQuery<CurrentUserType>(queryKeys.auth);

  if (data) {
    return <Navigate to="/" replace />;
  }

  return children ? <Layout>{children}</Layout> : <Outlet />;
};
