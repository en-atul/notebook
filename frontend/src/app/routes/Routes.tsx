import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./privateRoutes";
import { PublicRoutes } from "./publicRoutes";
import NoMatchPage from "app/404Page";
import { Navigate } from "react-router-dom";
import { CurrentUserType } from "interfaces";
import { USER_QUERY } from "services";
import { useQuery } from "@apollo/client";

export const AllRoutes = () => {
  const { data } = useQuery<{ user: CurrentUserType }>(USER_QUERY, {
    fetchPolicy: "cache-only",
  });

  return (
    <Router>
      <Routes>
        {PublicRoutes()}
        {PrivateRoutes()}
        <Route
          path="/"
          element={<Navigate to={data?.user ? "/" : "/signup"} replace />}
        />
        <Route path="*" element={<NoMatchPage />} />
      </Routes>
    </Router>
  );
};
