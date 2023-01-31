import { Route } from "react-router-dom";
import { PrivateRoute } from "components/HOCs";
import { DefaultLayout } from "components";
import NotesPage from "features/Notes";

export const PrivateRoutes = () => [
  <Route
    path="/"
    key="/"
    element={
      <PrivateRoute layout={DefaultLayout}>
        <NotesPage />
      </PrivateRoute>
    }
  />,
];
