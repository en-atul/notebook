import { Helmet } from "react-helmet";
import { AllRoutes } from "./routes/routes";
import { ErrorBoundary } from "./ErrorPage";
import { useAllSubscriptions } from "hooks";

const App = () => {
  useAllSubscriptions();
  return (
    <ErrorBoundary>
      <Helmet>
        <title>Notes</title>
      </Helmet>
      <AllRoutes />
    </ErrorBoundary>
  );
};
export default App;
