import { useSelector } from "react-redux";
import React from "react";
import { selectLoggedInUser, createUserAsync } from "../Components/AuthSlice";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
};

export default Protected;
