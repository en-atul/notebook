import { Helmet } from "react-helmet";
import { AllRoutes } from "./routes/Routes";
import { ErrorBoundary } from "./ErrorPage";

const App = () => {
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
