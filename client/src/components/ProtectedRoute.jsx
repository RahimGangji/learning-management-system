import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // If a specific role is required and user doesn't have it, redirect to home
    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/" />;
    }

    // If authenticated and role matches (or no specific role required), render children
    return children;
};

export default ProtectedRoute;
