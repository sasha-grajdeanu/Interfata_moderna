import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
    const jwt = sessionStorage.getItem("jwt");
    if (!jwt) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default AuthGuard;
