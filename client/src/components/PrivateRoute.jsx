// src/components/PrivateRoute.jsx
import React from 'react';
import { Route } from 'wouter';
import { storage } from "@/lib/storage";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";

const PrivateRoute = ({ component: Component, adminOnly = false }) => {
  const user = storage.getCurrentUser();

  if (!user) {
    return <Route component={Login} />;
  }

  if (adminOnly && !user.isAdmin) {
    return <Route component={NotFound} />;
  }

  return <Route component={Component} />;
};

export default PrivateRoute;
