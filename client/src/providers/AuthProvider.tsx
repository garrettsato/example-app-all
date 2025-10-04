import React, { createContext, useContext, useState, useEffect } from 'react';
import { isUserAuthenticated } from "../services/authService";

// Create the context
const AuthContext = createContext<any>(null);

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate checking token (e.g., from localStorage or an API call)
        console.log("check auth");
        if (isUserAuthenticated()) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false);  // Once authentication is checked
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
