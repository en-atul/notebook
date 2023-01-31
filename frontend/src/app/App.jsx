import React from "react";
import { MainLayout } from "components";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.min.css";
import { AllRoutes } from "./routes/Routes";
import { ErrorBoundary } from "./ErrorPage";
import TagManager from "react-gtm-module";

const Main = () => {
  return (
    <AllRoutes />
  );
};

const App = () => {

  const tagManagerArgs = {
    gtmId: "GTM-TQ25D8X",
  };
  TagManager.initialize(tagManagerArgs);

  return (
    <ErrorBoundary>
      <Helmet>
        <title>MKI Legal - Family Lawyers</title>
        <meta
          name="title"
          content="MKI Legal - Family Law Services Australia Wide"
        />
        <meta
          name="description"
          content="MKi Legal helps separated and divorced couples move through the legal issues quicker so they can move on with life."
        />
      </Helmet>
      <ToastContainer
        position={toast.POSITION.BOTTOM_RIGHT}
        hideProgressBar
        transition={Bounce}
      />
      {/* <ConnectedRouter history={history}> */}
      <Main />
      {/* </ConnectedRouter> */}
    </ErrorBoundary>
  );
};
export default App;
