import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuthorized, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthorized ? (
          <Component {...props} />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;
