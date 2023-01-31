import { Navigate, Outlet } from "react-router-dom";
import { useQueryClient } from "react-query";
import { CurrentUserType } from "interfaces";
import { FC, ReactNode } from "react";
import { DefaultLayout } from "components";

export const PrivateRoute: FC<{
  children: ReactNode;
  layout: FC<{
    children: ReactNode;
  }>;
}> = ({ children, layout: ComponentLayout }) => {
  const Layout = ComponentLayout || DefaultLayout;
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<CurrentUserType>("auth");

  if (!data) {
    return <Navigate to="/login" replace />;
  }

  return children ? <Layout>{children}</Layout> : <Outlet />;
};
