import { Navigate, Outlet } from "react-router-dom";
import { CurrentUserType } from "interfaces";
import { FC, ReactNode } from "react";
import { DefaultLayout } from "components";
import { USER_QUERY } from "services";
import { useQuery } from "@apollo/client";

export const PrivateRoute: FC<{
  children: ReactNode;
  layout: FC<{
    children: ReactNode;
  }>;
}> = ({ children, layout: ComponentLayout }) => {
  const Layout = ComponentLayout || DefaultLayout;
  const { data } = useQuery<{ user: CurrentUserType }>(USER_QUERY, {
    fetchPolicy: "cache-only",
  });

  if (!data?.user) {
    return <Navigate to="/login" replace />;
  }

  return children ? <Layout>{children}</Layout> : <Outlet />;
};
