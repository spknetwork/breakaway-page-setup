import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default PrivateRoute;
