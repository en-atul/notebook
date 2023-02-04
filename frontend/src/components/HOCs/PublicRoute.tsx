import { Navigate, Outlet } from "react-router-dom";
import { DefaultLayout } from "components";
import { CurrentUserType } from "interfaces";
import { FC, ReactNode } from "react";
import { USER_QUERY } from "services";
import { useQuery } from "@apollo/client";

export const PublicRoute: FC<{
  children: ReactNode;
  layout: FC<{
    children: ReactNode;
  }>;
}> = ({ children, layout: ComponentLayout }) => {
  const Layout = ComponentLayout || DefaultLayout;

  const { data } = useQuery<{ user: CurrentUserType }>(USER_QUERY, {
    fetchPolicy: "cache-only",
  });

  if (data?.user) {
    return <Navigate to="/" replace />;
  }

  return children ? <Layout>{children}</Layout> : <Outlet />;
};
