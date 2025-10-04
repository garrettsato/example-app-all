

import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth} from "../providers/AuthProvider";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();


    if (loading) {
        // You can show a loading spinner or placeholder while checking authentication
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        // If not authenticated, redirect to login
        return <Navigate to="/login" />;
    }

    // If authenticated, allow access to the child components (protected route)
    return children;
};

export default ProtectedRoute;