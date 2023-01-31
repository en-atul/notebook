import { PublicRoute } from "components/HOCs";
import { Route } from "react-router-dom";
import Signup from "features/Auth/Signup";
import { DefaultLayout } from "components";
import Login from "features/Auth/Login";

export const PublicRoutes = () => [
  <Route
    path="signup"
    key="signup"
    element={
      <PublicRoute layout={DefaultLayout}>
        <Signup />
      </PublicRoute>
    }
  />,
  <Route
    path="login"
    key="login"
    element={
      <PublicRoute layout={DefaultLayout}>
        <Login />
      </PublicRoute>
    }
  />,
];
