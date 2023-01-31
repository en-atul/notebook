import { Helmet } from "react-helmet";
import { AllRoutes } from "./routes/Routes";
import { ErrorBoundary } from "./ErrorPage";

const Main = () => {
  return <AllRoutes />;
};

const App = () => {
  return (
    <ErrorBoundary>
      <Helmet>
        <title>Notes</title>
      </Helmet>

      {/* <ConnectedRouter history={history}> */}
      <Main />
      {/* </ConnectedRouter> */}
    </ErrorBoundary>
  );
};
export default App;
