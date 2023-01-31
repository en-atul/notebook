import { Route, Routes, useLocation } from "react-router-dom";

export const RouteTransition = ({ render, ...rest }) => {
    return <Route {...rest} render={render} />;
};

export const AnimatedRoutes = ({ children }) => {
    const location = useLocation();
    return (
        <Routes key={location.pathname} location={location}>
            {children}
        </Routes>
    );
};
