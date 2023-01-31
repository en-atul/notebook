import { PublicRoute } from "components/HOCs";
import { Route } from "react-router-dom";
import Signup from "features/Auth/Signup";
import { AuthLayout } from "components";
import Login from "features/Auth/Login";

export const PublicRoutes = () => [
  <Route
    path="signup"
    key="signup"
    element={
      <PublicRoute layout={AuthLayout}>
        <Signup />
      </PublicRoute>
    }
  />,
  <Route
    path="login"
    key="login"
    element={
      <PublicRoute layout={AuthLayout}>
        <Login />
      </PublicRoute>
    }
  />,
];
