import { Navigate, Outlet } from "react-router-dom";
import { useQueryClient } from "react-query";
import { DefaultLayout } from "components";
import { CurrentUserType } from "interfaces";
import { FC, ReactNode } from "react";

export const PublicRoute: FC<{
  children: ReactNode;
  layout: FC<{
    children: ReactNode;
  }>;
}> = ({ children, layout: ComponentLayout }) => {
  const Layout = ComponentLayout || DefaultLayout;

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<CurrentUserType>("auth");

  if (data) {
    return <Navigate to="/" replace />;
  }

  return children ? <Layout>{children}</Layout> : <Outlet />;
};
