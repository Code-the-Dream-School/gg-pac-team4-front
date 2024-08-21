import { Navigate, Outlet } from "react-router-dom";

import React from "react";
import { useAuth } from "./AuthProvider";

const PrivateRoute = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ?  <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;