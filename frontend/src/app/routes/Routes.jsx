import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./privateRoutes";
import { PublicRoutes } from "./publicRoutes";
import NoMatchPage from "app/404Page";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ConsentOrderPricing from "Pages/ConsentOrder/Pricing";
import ThankYou from "Pages/ConsentOrder/Pricing/ThankYou";
import { CommonRoute, ConsentOrderPricingLayout } from "components";

export const AllRoutes = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <Router>
      <Routes>
        {PublicRoutes()}
        {PrivateRoutes()}
        <Route
          path="consent-order-pricing"
          key="consent-order-pricing"
          element={
            <CommonRoute layout={ConsentOrderPricingLayout}>
              <ConsentOrderPricing />
            </CommonRoute>
          }
        />
        <Route
          path="consent-orders-thank-you"
          key="consent-orders-thank-you"
          element={
            <CommonRoute layout={ConsentOrderPricingLayout}>
              <ThankYou />
            </CommonRoute>
          }
        />
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/home" : "/signup"} replace />}
        />
        <Route path="*" element={<NoMatchPage />} />
      </Routes>
    </Router>
  );
};
