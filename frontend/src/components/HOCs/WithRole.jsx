import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const withOnboarding = (Component) => {
    const WithOnboardingWrapper = () => {
        const { pathname } = useLocation();
        const { isOnboardingCompleted } = useSelector((state) => state.auth);

        if (!isOnboardingCompleted && pathname !== "/onboarding") {
            return <Navigate to="/onboarding" />;
        } else if (isOnboardingCompleted && pathname === "/onboarding") return <Navigate to="/" />;
        return <Component />;
    };
    return WithOnboardingWrapper;
};
