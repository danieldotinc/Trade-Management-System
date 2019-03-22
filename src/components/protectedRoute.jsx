import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/authService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      path={path}
      render={props => {
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/Login",
                state: { from: props.location }
              }}
            />
          );
        return Component ? <Component {...rest} {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
