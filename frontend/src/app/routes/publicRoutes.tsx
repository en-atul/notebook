import { PublicRoute } from "components/HOCs";
import { Route } from "react-router-dom";
import Signup from "features/Auth/Signup";
import { DafaultLayout } from "components";
import Login from "features/Auth/Login";

export const PublicRoutes = () => [
  <Route
    path="signup"
    key="signup"
    element={
      <PublicRoute layout={DafaultLayout}>
        <Signup />
      </PublicRoute>
    }
  />,
  <Route
    path="login"
    key="login"
    element={
      <PublicRoute layout={DafaultLayout}>
        <Login />
      </PublicRoute>
    }
  />,
 
];
