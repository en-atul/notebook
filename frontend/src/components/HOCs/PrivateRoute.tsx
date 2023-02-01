import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import { CurrentUserType } from "interfaces";
import { FC, ReactNode } from "react";
import { DefaultLayout } from "components";
import { queryKeys } from "definitions";

export const PrivateRoute: FC<{
  children: ReactNode;
  layout: FC<{
    children: ReactNode;
  }>;
}> = ({ children, layout: ComponentLayout }) => {
  const Layout = ComponentLayout || DefaultLayout;
  const { data } = useQuery<CurrentUserType>(queryKeys.auth);

  if (!data) {
    return <Navigate to="/login" replace />;
  }

  return children ? <Layout>{children}</Layout> : <Outlet />;
};
