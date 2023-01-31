import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./privateRoutes";
import { PublicRoutes } from "./publicRoutes";
import NoMatchPage from "app/404Page";
import { Navigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { CurrentUserType } from "interfaces";

export const AllRoutes = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<CurrentUserType>("auth");

  return (
    <Router>
      <Routes>
        {PublicRoutes()}
        {PrivateRoutes()}
        <Route
          path="/"
          element={<Navigate to={data ? "/" : "/signup"} replace />}
        />
        <Route path="*" element={<NoMatchPage />} />
      </Routes>
    </Router>
  );
};
